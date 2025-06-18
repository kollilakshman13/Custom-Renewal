import frappe

# @frappe.whitelist(allow_guest=True)
# def get_custom_otp_method(user):
#     # Load user roles
#     roles = frappe.get_roles(user)

#     # Logic: Role-based OTP method
#     if "Employee" in roles:
#         return "OTP App"  # Enforce Authenticator App
#     elif "Customer" in roles:
#         return "Email"  # Email OTP
#     else:
#         return frappe.db.get_single_value("System Settings", "otp_method") or "Email"

import frappe

@frappe.whitelist(allow_guest=True)
def get_custom_otp_method(user):
    roles = frappe.get_roles(user)
    if "Employee" in roles:
        return "OTP App"
    elif "Customer" in roles:
        return "Email"
    return "Email"

import frappe
from frappe.twofactor import get_otp_secret_for_

@frappe.whitelist(allow_guest=True)
def has_custom_2fa(user):
    roles = frappe.get_roles(user)

    # Employees must use 2FA via app
    if "Employee" in roles:
        return True

    # Customers – use email 2FA only if email exists
    if "Customer" in roles:
        user_doc = frappe.get_doc("User", user)
        return bool(user_doc.email)

    # Default fallback
    return False
