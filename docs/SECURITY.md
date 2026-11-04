# Security

- Never expose service-role keys in frontend code.
- Never trust client-submitted prices; verify payments server-side.
- Enforce RBAC server-side, not by hiding buttons.
- Ordinary users cannot change their own admin roles.
- Validate ownership before returning private data (orders, downloads,
  student records, exam results).
- Paid downloads via signed/private storage URLs only.
- Audit log for admin login, role changes, product changes, payment
  verification and user status changes.
- Use HTTPS in production.
