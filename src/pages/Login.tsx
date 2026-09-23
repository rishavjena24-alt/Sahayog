import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Users,
  BriefcaseBusiness,
  ShieldCheck,
  ArrowRight,
  Mail,
  LockKeyhole,
  Handshake,
  Sparkles,
  ChevronLeft,
} from "lucide-react";
import { useToast } from "../useToast";
import { useAuth } from "../context/useAuth";
import { Role } from "../types";

interface RoleOption {
  id: Role;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number }>;
  to: string;
}

const roles: RoleOption[] = [
  { id: "customer", title: "Customer", description: "Book household services", icon: Users, to: "/dashboard" },
  { id: "provider", title: "Service Provider", description: "Offer your skills", icon: BriefcaseBusiness, to: "/provider" },
  { id: "admin", title: "Admin", description: "Manage the platform", icon: ShieldCheck, to: "/admin" },
];

const demoAccounts: Array<{ role: Role; label: string; email: string; to: string }> = [
  { role: "customer", label: "Customer", email: "ananya@example.com", to: "/dashboard" },
  { role: "provider", label: "Provider", email: "rekha@example.com", to: "/provider" },
  { role: "admin", label: "Admin", email: "admin@sahayog.in", to: "/admin" },
];

export const Login: React.FC = () => {
  const [role, setRole] = useState<Role>("customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const { login } = useAuth();

  const redirectTarget = () => {
    const from = location.state?.from;
    return from || roles.find((r) => r.id === role)?.to || "/dashboard";
  };

  function signIn(targetRole: Role) {
    login(targetRole);
    const t = roles.find((r) => r.id === targetRole);
    toast(`Signed in as ${t?.title}. Welcome to Sahayog!`, "success");
    const target = location.state?.from || t?.to || "/dashboard";
    setTimeout(() => navigate(target), 350);
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 4) {
      newErrors.password = "Password must be at least 4 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast("Please check form errors.", "error");
      return;
    }

    setErrors({});
    signIn(role);
  }

  function demoLogin(d: typeof demoAccounts[0]) {
    setRole(d.role);
    setEmail(d.email);
    setPassword("demo1234");
    setErrors({});
    signIn(d.role);
  }

  return (
    <div className="login-page">
      <div className="login-topbar">
        <Link to="/" className="login-back" aria-label="Back to home">
          <ChevronLeft size={18} aria-hidden="true" /> Back to home
        </Link>
        <Link to="/" className="login-brand">
          <span className="brand-icon" aria-hidden="true"><Handshake size={20} /></span>
          <span className="brand-text">Sahayog</span>
        </Link>
      </div>

      <div className="login-frame">
        <div className="login-left">
          <span className="hero-badge">
            <Sparkles size={15} aria-hidden="true" /> Together We Grow
          </span>

          <h1>
            Empowering people.
            <br />
            Strengthening <span className="grad-text">communities.</span>
          </h1>

          <p className="login-desc">
            Connect with trusted local service providers, discover opportunities,
            and build a stronger cooperative community.
          </p>

          <div className="login-features">
            <div><ShieldCheck size={22} aria-hidden="true" /><span>Trusted local service providers</span></div>
            <div><Users size={22} aria-hidden="true" /><span>Community-powered services</span></div>
            <div><BriefcaseBusiness size={22} aria-hidden="true" /><span>Meaningful earning opportunities</span></div>
          </div>

          <div className="login-quote">
            &ldquo;The cooperative model isn&apos;t charity. It&apos;s the most efficient way
            to build income, dignity and safety for local workers.&rdquo;
            <cite>&mdash; Sahayog Founding Charter</cite>
          </div>
        </div>

        <div className="login-card">
          <div className="login-heading">
            <h2>Welcome back!</h2>
            <p>Sign in to your Sahayog account</p>
          </div>

          <div className="role-selection">
            <label id="role-label">Login as</label>
            <div className="role-grid" role="radiogroup" aria-labelledby="role-label">
              {roles.map((item) => {
                const IconComp = item.icon;
                const isSelected = role === item.id;
                return (
                  <button
                    type="button"
                    key={item.id}
                    className={isSelected ? "role-card selected" : "role-card"}
                    onClick={() => setRole(item.id)}
                    role="radio"
                    aria-checked={isSelected}
                  >
                    <IconComp size={21} />
                    <strong>{item.title}</strong>
                    <small>{item.description}</small>
                  </button>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleLogin} noValidate>
            <label className="field-label" htmlFor="email">Email Address</label>
            <div className="input-box">
              <Mail size={19} aria-hidden="true" />
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                }}
                required
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
            </div>
            {errors.email && (
              <span id="email-error" className="field-error" style={{ color: "var(--red)", fontSize: "0.85rem", display: "block", marginTop: "4px" }}>
                {errors.email}
              </span>
            )}

            <label className="field-label" htmlFor="password" style={{ marginTop: "16px" }}>Password</label>
            <div className="input-box">
              <LockKeyhole size={19} aria-hidden="true" />
              <input
                id="password"
                type={showPass ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors((prev) => ({ ...prev, password: "" }));
                }}
                required
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? "password-error" : undefined}
              />
              <button
                type="button"
                className="toggle-pass"
                onClick={() => setShowPass((s) => !s)}
                aria-label="Toggle password visibility"
              >
                {showPass ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <span id="password-error" className="field-error" style={{ color: "var(--red)", fontSize: "0.85rem", display: "block", marginTop: "4px" }}>
                {errors.password}
              </span>
            )}

            <div className="login-options">
              <label className="remember">
                <input type="checkbox" /> Remember me
              </label>
              <a href="#forgot" className="link-muted">Forgot password?</a>
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Sign In <ArrowRight size={18} aria-hidden="true" />
            </button>
          </form>

          <div className="demo-box">
            <p>No sign-up needed — tap a demo role:</p>
            <div className="demo-row">
              {demoAccounts.map((d) => (
                <button
                  type="button"
                  key={d.role}
                  className="demo-chip"
                  onClick={() => demoLogin(d)}
                  title={`Sign in as ${d.email}`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          <p className="signup-text">
            Don&apos;t have an account?
            <Link to="/offer-service"> Create one as a Provider</Link>
          </p>

          <p className="demo-note">
            Demo prototype — any valid email &amp; password works.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
