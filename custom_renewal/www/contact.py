
# import frappe
# from frappe import _
# from frappe.utils import validate_email_address

# @frappe.whitelist(allow_guest=True)
# def handle_contact_form():
#     try:
#         frappe.log("Request method: " + frappe.local.request.method)
#         frappe.log("Request headers: " + str(frappe.local.request.headers))

#         if frappe.local.request.method != "POST":
#             frappe.log_error("Invalid Request Method")
#             frappe.throw(_("Invalid Request Method"), frappe.MethodNotAllowedError)

#         data = frappe.local.form_dict
#         frappe.log("Received form data: " + str(data))

#         required_fields = ['name', 'email', 'phone_no', 'service_name', 'message']
#         for field in required_fields:
#             if not data.get(field):
#                 frappe.log_error(f"Missing field: {field}")
#                 frappe.throw(_(f"{field.capitalize()} is required"))

#         name = data.get('name')
#         email = data.get('email')
#         phone_no = data.get('phone_no')
#         service_name = data.get('service_name')
#         message = data.get('message')
#         subject = data.get('subject') or "New Contact Form Submission"

#         message_body = f"""
#                 <p><b>Name:</b> {name}</p>
#                 <p><b>Email:</b> {email}</p>
#                 <p><b>Phone Number:</b> {phone_no}</p>
#                 <p><b>Service Name:</b> {service_name}</p>
#                 <p><b>Message:</b> {message}</p>
#         """

#         recipient_email = "kollilakshman13@gmail.com"
#         email_account = frappe.get_value("Email Account", {"default_outgoing": 1}, "email_id")
#         if email_account:
#             sender_email = email_account
        
#         frappe.sendmail(recipients=[recipient_email], sender=sender_email, subject=subject, message=message_body)
#         frappe.msgprint(_("Form submitted successfully! Email sent."))

#         frappe.local.response.update({
#             "status": "success",
#             "message": "Form submitted successfully! Email sent."
#         })
#     except Exception as e:
#         frappe.log_error(f"Failed to process form: {str(e)}")
#         frappe.throw(_("There was an issue submitting the form. Please try again later."))


import frappe
import dns.resolver
import smtplib
from frappe import _
from frappe.utils import validate_email_address

DISPOSABLE_EMAIL_DOMAINS = [
    "tempmail", "guerrillamail", "mailinator", "10minutemail", "yopmail", "throwawaymail",
    "trashmail", "dispostable", "maildrop", "spamgourmet", "getnada", "fakeinbox", "mailnesia",
    "sharklasers", "grr.la", "mail-temporaire", "tempemail", "spambox", "incognitomail"
]

def has_valid_mx_record(domain):
    """Check if the domain has valid MX (mail exchange) records."""
    try:
        mx_records = dns.resolver.resolve(domain, 'MX')
        return bool(mx_records)
    except (dns.resolver.NoAnswer, dns.resolver.NXDOMAIN, dns.resolver.Timeout):
        return False

def check_smtp_email_exists(email):
    """Check if an email address exists using SMTP verification."""
    domain = email.split('@')[-1]

    try:
        mx_records = dns.resolver.resolve(domain, 'MX')
        mail_server = str(mx_records[0].exchange) 
        
        server = smtplib.SMTP(mail_server, 25, timeout=5)
        server.helo()
        #server.ehlo()
        server.mail("test@example.com") 
        code, response = server.rcpt(email)
        server.quit()

        if code == 250:  
            return True
        else:
            return False
    except Exception as e:
        frappe.log_error(f"SMTP validation error for {email}: {str(e)}")
        return False

def is_valid_email(email):
    """Check if the email is valid and not fake."""

    if not validate_email_address(email):
        frappe.throw(_("Invalid email format. Please enter a valid email address."))

    try:
        domain = email.split('@')[-1].lower()

        if any(spam_domain in domain for spam_domain in DISPOSABLE_EMAIL_DOMAINS):
            frappe.throw(_("Temporary/disposable email addresses are not allowed."))

        if not has_valid_mx_record(domain):
            frappe.throw(_("Invalid email domain. No mail server found."))

        if not check_smtp_email_exists(email):
            frappe.throw(_("This email address does not exist. Please enter a real email."))

        return True  

    except Exception as e:
        frappe.log_error(f"Email validation error: {str(e)}")
        frappe.throw(_("Email validation failed. Please enter a valid email."))

@frappe.whitelist(allow_guest=True)
def handle_contact_form():
    try:
        if frappe.local.request.method != "POST":
            frappe.throw(_("Invalid Request Method"), frappe.MethodNotAllowedError)

        data = frappe.local.form_dict

        required_fields = ['name', 'email', 'phone_no', 'service_name', 'message']
        for field in required_fields:
            if not data.get(field):
                frappe.throw(_(f"{field.capitalize()} is required"))

        name = data.get('name')
        email = data.get('email')
        phone_no = data.get('phone_no')
        service_name = data.get('service_name')
        message = data.get('message')
        subject = data.get('subject') or "New Contact Form Submission"

        
        is_valid_email(email)

        recipient_email = "kollilakshman13@gmail.com"
        email_account = frappe.get_value("Email Account", {"default_outgoing": 1}, "email_id")
        sender_email = email_account 

        message_body = f"""
                <p><b>Name:</b> {name}</p>
                <p><b>Email:</b> {email}</p>
                <p><b>Phone Number:</b> {phone_no}</p>
                <p><b>Service Name:</b> {service_name}</p>
                <p><b>Message:</b> {message}</p>
        """

        frappe.sendmail(recipients=[recipient_email], sender=sender_email, subject=subject, message=message_body)
        frappe.msgprint(_("Form submitted successfully! Email sent."))

        frappe.local.response.update({
            "status": "success",
            "message": "Form submitted successfully! Email sent."
        })
    except Exception as e:
        frappe.log_error(f"Failed to process form: {str(e)}")
        frappe.throw(_("There was an issue submitting the form. Please try again later."))

