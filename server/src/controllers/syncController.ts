import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { prisma } from '../prisma/client';

const DATA_SHEETS_DIR = path.resolve(__dirname, '../../../data_sheets');

const ensureDirectoryExists = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

export const syncAllSheets = async (req: Request, res: Response): Promise<void> => {
  try {
    ensureDirectoryExists(DATA_SHEETS_DIR);

    // 1. User Accounts
    const users = await prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
    const userHeaders = ['User_ID', 'Full_Name', 'Email_Login_ID', 'Role', 'Location', 'Phone', 'Member_Since', 'Created_At'];
    const userRows = users.map(u => [
      `"${u.id}"`,
      `"${u.name}"`,
      `"${u.email}"`,
      `"${u.role}"`,
      `"${u.location || ''}"`,
      `"${u.phone || ''}"`,
      `"${u.memberSince || ''}"`,
      `"${u.createdAt.toISOString()}"`
    ].join(','));
    const userCsv = [userHeaders.join(','), ...userRows].join('\n');
    fs.writeFileSync(path.join(DATA_SHEETS_DIR, 'user_accounts.csv'), userCsv, 'utf-8');

    // 2. Workers Revenue & Ratings
    const providers = await prisma.provider.findMany({ orderBy: { id: 'asc' } });
    const bookings = await prisma.booking.findMany();

    const workerHeaders = [
      'Worker_ID',
      'Worker_Name',
      'Category',
      'Cooperative_Group',
      'Rating',
      'Total_Reviews',
      'Total_Jobs_Completed',
      'Base_Rate_INR',
      'Total_Gross_Revenue_INR',
      'Worker_Payout_95pct_INR',
      'Platform_Reserve_5pct_INR',
      'Status'
    ];

    const workerRows = providers.map(p => {
      const providerBookings = bookings.filter(b => b.providerId === p.id || b.customer.includes(p.name));
      const totalRevenue = providerBookings.reduce((sum, b) => sum + (b.price || 0), p.jobs * p.price);
      const workerPayout = Math.round(totalRevenue * 0.95);
      const platformFee = Math.round(totalRevenue * 0.05);

      return [
        p.id,
        `"${p.name}"`,
        `"${p.category}"`,
        `"${p.cooperative}"`,
        p.rating.toFixed(1),
        p.reviews,
        p.jobs,
        p.price,
        totalRevenue,
        workerPayout,
        platformFee,
        p.available ? 'Active' : 'Offline'
      ].join(',');
    });
    const workerCsv = [workerHeaders.join(','), ...workerRows].join('\n');
    fs.writeFileSync(path.join(DATA_SHEETS_DIR, 'workers_revenue.csv'), workerCsv, 'utf-8');

    // 3. Schedule & Bookings
    const scheduleHeaders = [
      'Booking_ID',
      'Customer_Name',
      'Service_Assigned',
      'Worker_ID',
      'Date_Scheduled',
      'Time_Slot',
      'Total_Amount_INR',
      'Payment_Mode',
      'Service_Status',
      'Customer_Rating',
      'Customer_Address'
    ];

    const services = await prisma.service.findMany();
    const serviceMap = new Map(services.map(s => [s.id, s.name]));

    const scheduleRows = bookings.map(b => [
      `"${b.id}"`,
      `"${b.customer}"`,
      `"${b.serviceId ? serviceMap.get(b.serviceId) || 'Cooperative Service' : 'Cooperative Service'}"`,
      b.providerId || 'N/A',
      `"${b.date}"`,
      `"${b.time}"`,
      b.price,
      `"${b.payment}"`,
      `"${b.status}"`,
      b.rating || 'Unrated',
      `"${(b.address || '').replace(/"/g, '""')}"`
    ].join(','));
    const scheduleCsv = [scheduleHeaders.join(','), ...scheduleRows].join('\n');
    fs.writeFileSync(path.join(DATA_SHEETS_DIR, 'schedule_bookings.csv'), scheduleCsv, 'utf-8');

    res.json({
      success: true,
      message: 'All spreadsheets synced successfully to data_sheets/',
      sheetsUpdated: [
        'data_sheets/user_accounts.csv',
        'data_sheets/workers_revenue.csv',
        'data_sheets/schedule_bookings.csv'
      ],
      timestamp: new Date().toISOString()
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Error syncing spreadsheets' });
  }
};

export const downloadSheet = async (req: Request, res: Response): Promise<void> => {
  try {
    const sheetName = String(req.params.sheetName);
    const allowed = ['user_accounts.csv', 'workers_revenue.csv', 'schedule_bookings.csv'];
    if (!allowed.includes(sheetName)) {
      res.status(404).json({ error: 'Spreadsheet not found' });
      return;
    }

    const filePath = path.join(DATA_SHEETS_DIR, sheetName);
    if (!fs.existsSync(filePath)) {
      res.status(404).json({ error: 'File does not exist yet. Please trigger sync.' });
      return;
    }

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="${sheetName}"`);
    fs.createReadStream(filePath).pipe(res);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Error downloading spreadsheet' });
  }
};
