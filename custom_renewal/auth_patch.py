import frappe
from frappe.auth import LoginManager

def patched_validate_otp(self, otp=None):
    user = self.user
    roles = frappe.get_roles(user)

    if "Customer" in roles:
        self.otp_method = "Email"
    elif "Employee" in roles:
        self.otp_method = "OTP App"

    # Then call Frappe's normal flow
    from frappe.twofactor import should_run_2fa
    if should_run_2fa(user):
        self.run_trigger_2fa(otp=otp)
