import secrets
from frappe.utils import get_url
from frappe.core.doctype.communication.email import make

def generate_otp():
    otp = secrets.randbelow(1000000)  # Generates a 6-digit OTP
    return str(otp).zfill(6)  # Ensure it's always 6 digits

def send_otp_to_user(user_email, otp):
    subject = "Your OTP for login"
    body = f"Your OTP for login is {otp}. This OTP will expire in 10 minutes."
    make(
        recipients=[user_email],
        subject=subject,
        content=body,
        communication_type="Email",
        sent_or_received="Sent"
    )
