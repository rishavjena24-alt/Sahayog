import React from "react";
import { Link } from "react-router-dom";
import { formatINR } from "../data";
import StatusBadge from "./StatusBadge";

interface BookingTableProps {
  bookings: any[];
  serviceMap: Record<string | number, any>;
  providerMap: Record<string | number, any>;
  showCustomer?: boolean;
  compact?: boolean;
}

export const BookingTable: React.FC<BookingTableProps> = ({
  bookings,
  serviceMap,
  providerMap,
  showCustomer = false,
  compact = false,
}) => {
  return (
    <div className="table-wrap">
      <table className="booking-table" aria-label="Bookings List">
        <thead>
          <tr>
            <th scope="col">Booking ID</th>
            {showCustomer && <th scope="col">Customer</th>}
            <th scope="col">Service</th>
            {!compact && <th scope="col">Provider</th>}
            {!compact && <th scope="col">Date</th>}
            <th scope="col">Amount</th>
            <th scope="col">Status</th>
            <th scope="col"><span className="sr-only">Actions</span></th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => {
            const svc = serviceMap[b.serviceId];
            const prov = providerMap[b.providerId];
            return (
              <tr key={b.id}>
                <td className="mono">{b.id}</td>
                {showCustomer && <td><strong>{b.customer}</strong></td>}
                <td>{svc ? svc.name : "—"}</td>
                {!compact && <td>{prov ? prov.name : "—"}</td>}
                {!compact && <td>{b.date}</td>}
                <td className="strong">{formatINR(b.price)}</td>
                <td><StatusBadge status={b.status} /></td>
                <td>
                  <Link
                    to={`/bookings/${b.id}`}
                    className="table-link"
                    aria-label={`View booking ${b.id}`}
                  >
                    View
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;
