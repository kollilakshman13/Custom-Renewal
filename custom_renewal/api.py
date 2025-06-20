#event registration doctype send email code 

# import frappe
# import pytz

# @frappe.whitelist()
# def email_on_approval(doc, method):
#     frappe.msgprint("approval function trigger")
#     frappe.msgprint(f"Current Workflow State: '{doc.workflow_state}'")
    
#     if doc.workflow_state == 'Approved' and not doc.email_sent:
#         frappe.msgprint("Sending email for the approved sales user")
#         send_approval_email(doc)
#         doc.email_sent = True
#         doc.save()

# @frappe.whitelist()
# def send_approval_email(doc):
#     try:
#         frappe.msgprint("sending email")
#         event_doc = frappe.get_doc("Event", doc.event_name)
        
#         # Ensure that required fields exist before proceeding
#         if not doc.email:
#             frappe.throw("Recipient email is missing.")
        
#         event_link = event_doc.custom_link_ if hasattr(event_doc, 'custom_link_') else None
#         event_venue = event_doc.custom_venue if hasattr(event_doc, 'custom_venue') else None
#         event_subject = event_doc.subject if hasattr(event_doc, 'subject') else "Event"
#         starts_on = event_doc.starts_on if hasattr(event_doc, 'starts_on') else None
        
#         if starts_on:
#             ist_timezone = pytz.timezone('Asia/Kolkata')
#             starts_on_ist = starts_on.astimezone(ist_timezone)
#             formatted_date = starts_on_ist.strftime('%A, %B %d, %Y')
#             formatted_date1 = starts_on_ist.strftime('%I:%M %p IST')
#         else:
#             formatted_date = "Unknown Date"
#             formatted_date1 = "Unknown Time"
        
#         recipients = [doc.email]
#         subject = f"Event Approved: {event_subject}"
        
#         # Compose message based on available fields
#         if event_link:
#             message = f"""
#                 <div style="font-family:Arial,sans-serif;margin:0;padding:0;background-color:#f4f4f4;">
#                     <div style="width:100%;max-width:600px;margin:10px auto;background-color:#ffffff;padding:20px;border-radius:8px;box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
#                         <div style="background-color:#EA8300;padding:5px;color:#ffffff;justify-content:space-between;">
#                             <h2 style="text-align:center">64Network Security Pvt Ltd </h2>
#                             <h2 style="text-align:center">{event_subject}</h2>
#                         </div>

#                         <div style="margin:20px 0;">
#                             <h3 style="color:#333333;">Thank you for registering! </h3>
#                             <p style="color:#666666;line-height:1.5;">Save this email for details on the webcast</p>
#                             <p style="color:#666666;line-height:1.5;"><strong>Live Webcast Date:</strong> {formatted_date}</p>
#                             <p style="color:#666666;line-height:1.5;"><strong>Live Webcast Time:</strong> {formatted_date1}</p>
#                             <p style="color:#666666;line-height:1.5;">Use the link below to enter the webcast:</p>
#                             <p style="color:#666666;line-height:1.5;"><strong>Webcast Link:</strong> <a href="{event_link}" style="color:#1a73e8;text-decoration:none;">{event_link}</a></p>
#                         </div>
#                     </div>
#                 </div>
#             """
#         elif event_venue:
#             message = f"""
#                 <div style="font-family:Arial,sans-serif;margin:0;padding:0;background-color:#f4f4f4;">
#                     <div style="width:100%;max-width:600px;margin:10px auto;background-color:#ffffff;padding:20px;border-radius:8px;box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
#                         <div style="background-color:#EA8300;padding:5px;color:#ffffff;justify-content:space-between;">
#                             <h2 style="text-align:center">64Network Security Pvt Ltd </h2>
#                             <h2 style="text-align:center">{event_subject}</h2>
#                         </div>

#                         <div style="margin:20px 0;">
#                             <h3 style="color:#333333;">Thank you for registering! </h3>
#                             <p style="color:#666666;line-height:1.5;"><strong>Event Date:</strong> {formatted_date}</p>
#                             <p style="color:#666666;line-height:1.5;"><strong>Event Time:</strong> {formatted_date1}</p>
#                             <div style="font-weight: bold; margin-right: 5px;color:#666666;">Venue: {event_venue}</div>
#                         </div>
#                     </div>
#                 </div>
#             """
#         else:
#             message = "Thank you for your registration."

#         # Send email
#         frappe.sendmail(
#             recipients=recipients,
#             subject=subject,
#             message=message
#         )

#     except Exception as e:
#         frappe.log_error(frappe.get_traceback(), "Email Sending Error")
#         frappe.throw(f"Error occurred while sending email: {str(e)}")




        
##quotation margin table

import frappe
import json

##
# def update_margin_table(quotation, method=None):
#     try:
#         # Get the Quotation document
#         doc = frappe.get_doc("Quotation", quotation)

#         # Check if items exist in the document
#         if not doc.items:
#             frappe.msgprint("No items found in the quotation.")
#             return

#         # Flag to track whether any changes were made
#         margin_updated = False

#         # Update or add margin table entries
#         for item in doc.items:
#             actual_item_code = item.item_code

#             # Check if the margin table already contains this item
#             existing_margin_entry = None
#             for margin_entry in doc.margin_table:
#                 if margin_entry.item_code == actual_item_code:
#                     existing_margin_entry = margin_entry
#                     break

#             # If an existing entry is found, update it
#             if existing_margin_entry:
#                 if existing_margin_entry.selling_rate != item.rate or existing_margin_entry.selling_amount != item.amount:
#                     existing_margin_entry.selling_rate = item.rate
#                     existing_margin_entry.selling_amount = item.amount
#                     margin_updated = True  # Mark as updated
#             else:
#                 # If no existing entry, create a new one
#                 margin_entry = {
#                     'item_code': actual_item_code,
#                     'selling_rate': item.rate,
#                     'selling_amount': item.amount
#                 }
#                 doc.append('margin_table', margin_entry)
#                 margin_updated = True  # Mark as updated

#         # Only save the document if changes were made
#         if margin_updated:
#             doc.save(ignore_permissions=True)

#             # Commit the transaction if needed (usually save does this)
#             frappe.db.commit()
#             # Show a success message only once after actual changes
#             frappe.msgprint("Margin table updated successfully.")
        
#     except Exception as e:
#         # Log the exception for debugging
#         frappe.log_error(frappe.get_traceback(), "Update Margin Table Error")
#         frappe.msgprint("An error occurred while updating the margin table. Please check the logs for more details.")


##main
import frappe
import json

@frappe.whitelist()
def update_margin_table(quotation, method=None):
    try:
        # Get the Quotation document
        doc = frappe.get_doc("Quotation", quotation)

        # Flag to track whether any changes were made
        margin_updated = False

        # Update or add margin table entries
        for item in doc.items:
            actual_item_code = item.item_code
            # Check if the margin table already contains this item
            existing_margin_entry = None
            for margin_entry in doc.margin_table:
                if margin_entry.item_code == actual_item_code:
                    existing_margin_entry = margin_entry
                    break

            # If an existing entry is found, update it
            if existing_margin_entry:
                if (existing_margin_entry.selling_rate != item.rate or existing_margin_entry.selling_amount != item.amount or existing_margin_entry.quantity != item.qty ):
                    existing_margin_entry.selling_rate = item.rate
                    existing_margin_entry.selling_amount = item.amount
                    existing_margin_entry.quantity = item.qty
                    margin_updated = True  # Mark as updated
            else:
                # If no existing entry, create a new one
                margin_entry = {
                    'item_code': actual_item_code,
                    'selling_rate': item.rate,
                    'selling_amount': item.amount,
                    'quantity':item.qty
                }
                doc.append('margin_table', margin_entry)
                margin_updated = True  # Mark as updated

        # Only save the document if changes were made
        if margin_updated:
            doc.save(ignore_permissions=True)
            # Commit the transaction if needed (usually save does this)
            frappe.db.commit()

            # Show a success message only once after actual changes
            frappe.msgprint("Margin table updated successfully.")
        
    except Exception as e:
        frappe.log_error(frappe.get_traceback(), "Update Margin Table Error")
        frappe.msgprint(f"An error occurred: {str(e)}")




## sales_invoice_report.js start ##

import frappe

@frappe.whitelist()
def get_comments(reference_doctype, reference_name):
    return frappe.get_all("Comment", 
        filters={
            "reference_doctype": reference_doctype,
            "reference_name": reference_name,
            "comment_type": "Comment"
        },
        fields=["content", "creation", "owner"],
        order_by="creation desc"
    )

## sales_invoice_report.js ended ##




# ~/frappe-bench/apps/custom_renewal/api.py
import frappe

@frappe.whitelist()
def get_sales_manager_quotations():
    user = frappe.session.user
    user_doc = frappe.get_doc('User', user)
    sales_person = frappe.get_all(
        'Sales Person',
        filters={"sales_person_name": user_doc.full_name},
        fields=['name']
    )

    if sales_person:
        sales_person_name = sales_person[0]['name']
        child_sales_persons = frappe.get_all(
            'Sales Person',
            filters={'parent_sales_person': sales_person_name},
            fields=['name']
        )
        all_sales_persons = [sales_person_name]
        if child_sales_persons:
            all_sales_persons.extend([child['name'] for child in child_sales_persons])

        quotations = frappe.get_all(
            'Quotation',
            fields=['name']
        )
        quotation_names = [quotation['name'] for quotation in quotations]

        quotation_sales = frappe.get_all(
            "Sales Team",
            filters={
                'sales_person': ['in', all_sales_persons],
                'parent': ['in', quotation_names]
            },
            fields=['parent']
        )

        if quotation_sales:
            return [sales['parent'] for sales in quotation_sales]
        else:
            return []
    # else:
    #     frappe.throw("No Sales Person record found for the current user.")

@frappe.whitelist()
def filter_sales_manager_quotations():
    # Check if user has the Sales Manager role
    user = frappe.session.user
    if "Sales Manager" in frappe.get_roles(user):
        # Get the filtered quotation list for the current user
        quotation_list = get_sales_manager_quotations()
        return quotation_list
    # else:
    #     # If not a Sales Manager, return an empty list
    #     return []        




# @frappe.whitelist()
# def get_renewal_list(page=1, limit=20):
#     page = int(page)
#     limit = int(limit)
#     start = (page - 1) * limit

#     # Fetch records from the database
#     renewals = frappe.get_all(
#         "Renewal List",
#         fields=["*"],
#         start=start,
#         page_length=limit,
#     )
#     return renewals


# @frappe.whitelist()
# def get_renewal_list(page=1, limit=20, search=None):
#     offset = (int(page) - 1) * int(limit)
#     conditions = []

#     # Add search conditions
#     if search:
#         search = f"%{search}%"
#         conditions.append(
#             "(name LIKE %(search)s OR status LIKE %(search)s OR item_name LIKE %(search)s)"
#         )

#     condition_str = " AND ".join(conditions)
#     query = f"""
#         SELECT name, status, start_date, end_date, item_name, total_amount
#         FROM `tabRenewal List`
#         WHERE {condition_str if condition_str else '1=1'}
#         LIMIT %(limit)s OFFSET %(offset)s
#     """

#     data = frappe.db.sql(query, {"limit": limit, "offset": offset, "search": search}, as_dict=True)

#     # Count total rows for pagination
#     total_query = f"SELECT COUNT(*) FROM `tabRenewal List` WHERE {condition_str if condition_str else '1=1'}"
#     total = frappe.db.sql(total_query, {"search": search})[0][0]

#     return {"message": data, "total": total}



## issue 


import frappe
import base64

@frappe.whitelist(allow_guest=True)
def create_issue():
    try:
        data = frappe.local.form_dict
        attachment = frappe.request.files.get("attachment")

        # Validate mandatory fields
        if not data.get("subject") or not data.get("customer"):
            frappe.throw("Subject and Customer are mandatory fields.")

        # Create the Issue document
        issue = frappe.get_doc({
            "doctype": "Issue",
            "subject": data.get("subject"),
            "status": data.get("status", "Open"),
            "customer": data.get("customer"),
            "description": data.get("description"),
            "priority":data.get("priority")
        })
        issue.insert()

        # Save attachment if provided
        if attachment:
            _file = frappe.get_doc({
                "doctype": "File",
                "file_name": attachment.filename,
                "attached_to_doctype": "Issue",
                "attached_to_name": issue.name,
                "content": attachment.stream.read(),
                "is_private": 0,
            })
            _file.save()

        frappe.db.commit()
        return {"message": f"Issue {issue.name} created successfully."}

    except Exception as e:
        frappe.log_error(frappe.get_traceback(), "Issue Creation Failed")
        frappe.throw(f"An error occurred: {str(e)}")



# In your app's api.py

# import frappe

# @frappe.whitelist()  # Make this callable from the frontend
# def get_renewal_content():
#     # Fetch data for the Jinja template
#     doc = frappe.get_all('Renewal List', fields=['name', 'status', 'start_date', 'end_date'])
#     # Render the template
#     return frappe.render_template("custom_renewal/templates/includes/renewal_list1.html", {"doc": doc})

import frappe

@frappe.whitelist(allow_guest=True)  # allow_guest if needed for unauthenticated users
def get_renewal_content():
    # Fetch data for the Jinja template
    doc = frappe.get_all('Renewal List', fields=['*'])
    # Render the Jinja template
    html_content = frappe.render_template(
        "custom_renewal/templates/includes/renewal_list .html",
        {"doc": doc}
    )
    # Directly set the response as plain HTML
    frappe.response['type'] = 'text/html'
    return html_content

import frappe

@frappe.whitelist()
def get_sales_invoice_content():
    # Fetch data for Sales Invoice
    data = frappe.get_all('Sales Invoice', fields=['*'])
    # Render the template
    return frappe.render_template("custom_renewal/templates/includes/sales_invoice.html", {"data": data})


@frappe.whitelist()
def get_sales_order_content():
    # Fetch data for Sales Order
    data = frappe.get_all('Sales Order', fields=['*'])
    # Render the template
    return frappe.render_template("custom_renewal/templates/includes/sales_order.html", {"data": data})


@frappe.whitelist()
def get_renewal_list_content():
    # Fetch data for Renewal List
    data = frappe.get_all('Renewal List', fields=['*'])
    # Render the template
    return frappe.render_template("custom_renewal/templates/includes/renewal_list.html", {"data": data})

import frappe

@frappe.whitelist()
def is_customer():
    """Check if the logged-in user has the 'Customer' role."""
    user_roles = frappe.get_roles(frappe.session.user)
    return "Customer" in user_roles



@frappe.whitelist()
def get_profile_data():
    user = frappe.session.user  # Fetch the current logged-in user
    if user == "Guest":
        frappe.throw(("You need to be logged in to edit your profile."))

    user_doc = frappe.get_doc("User", user)  # Fetch the User document
    return {
        "first_name": user_doc.first_name,
        "middle_name": user_doc.middle_name or "",
        "last_name": user_doc.last_name,
        "phone": user_doc.phone or "",
        "mobile_no": user_doc.mobile_no or "",
        "user_image": user_doc.user_image or ""  # Add image field
    }


@frappe.whitelist()
def save_profile_data(first_name, middle_name, last_name, phone, mobile_no,user_image):
    user = frappe.session.user  # Fetch the current logged-in user
    if user == "Guest":
        frappe.throw("You need to be logged in to save your profile.")

    user_doc = frappe.get_doc("User", user)
    user_doc.first_name = first_name
    user_doc.middle_name = middle_name
    user_doc.last_name = last_name
    user_doc.phone = phone
    user_doc.mobile_no = mobile_no
    if user_image:
        user_doc.user_image = user_image  # Save the image file path
    user_doc.save(ignore_permissions=True)
    frappe.db.commit()
    return {"message":("Profile updated successfully.")}


@frappe.whitelist()
def mark_renewal_lost(renewal_id):
    renewal = frappe.get_doc("Renewal List", renewal_id)
    renewal.status = "Lost"
    renewal.save()
    frappe.db.commit()
    return True


# login page to website user opt and system user have otp app to collect the otps 

import frappe
import random
import pyotp
from frappe.auth import LoginManager

@frappe.whitelist(allow_guest=True)
def validate_credentials_and_send_otp_or_login(email, password):
    try:
        login_manager = LoginManager()
        login_manager.authenticate(user=email, pwd=password)
    except Exception:
        frappe.throw("Invalid email or password.")

    # ✅ Skip OTP for Administrator
    if email.lower() == "administrator":
        login_manager.post_login()
        return {
            "message": "Login successful",
            "otp_required": False
        }

    user = frappe.get_doc("User", email)
    user_type = user.user_type

    if user_type == "Website User":
        # Send email OTP
        otp = str(random.randint(100000, 999999))
        frappe.cache().hset("otp_cache", email, otp)

        subject = "Your ERPNext Login OTP"
        message = f"""
            Hi {user.full_name or 'User'},<br><br>
            Your OTP is <b>{otp}</b>. It is valid for 5 minutes.<br><br>
            Regards,<br>Your Company
        """

        try:                                 
            frappe.sendmail(
                recipients=email,
                subject=subject,
                message=message
            )
        except Exception:
            frappe.log_error(frappe.get_traceback(), "Email OTP Send Failed")
            frappe.throw("Failed to send OTP email. Please contact support.")

        return {
            "otp_required": True,
            "otp_method": "email",
            "message": "OTP sent to your email."
        }

    else:
        # TOTP for System Users
        if not user.get("otp_secret"):
            # First-time setup
            secret = pyotp.random_base32()
            user.otp_secret = secret
            user.save(ignore_permissions=True)
            frappe.db.commit()

            otp_uri = pyotp.totp.TOTP(secret).provisioning_uri(
                name=email,
                issuer_name="ERPNext"
            )
            return {
                "otp_required": True,
                "otp_method": "app",
                "message": "Scan the QR code using your Authenticator App",
                "otp_auth_url": otp_uri
            }
        return {
            "otp_required": True,
            "otp_method": "app",
            "message": "Enter the OTP from your Authenticator App"
        }

@frappe.whitelist(allow_guest=True)
def verify_otp_and_login(email, input_otp):
    if not email:
        frappe.throw("Missing email.")

    # ✅ Skip OTP for Administrator
    if email.lower() == "administrator":
        frappe.local.login_manager = LoginManager()
        frappe.local.login_manager.user = email
        frappe.local.login_manager.post_login()
        return {
            "message": "Login successful (Administrator)",
            "full_name": frappe.utils.get_fullname(email),
            "user_type": user_type
        }

    if not input_otp:
        frappe.throw("Missing OTP.")

    user = frappe.get_doc("User", email)
    user_type = user.user_type

    if user_type == "Website User":
        real_otp = frappe.cache().hget("otp_cache", email)
        if not real_otp:
            frappe.throw("OTP expired or not found.")
        if real_otp != input_otp:
            frappe.throw("Invalid OTP.")
        frappe.cache().hdel("otp_cache", email)

    else:
        otp_secret = user.get("otp_secret")
        if not otp_secret:
            frappe.throw("Authenticator App not configured for this user.")

        totp = pyotp.TOTP(otp_secret)
        if not totp.verify(input_otp):
            frappe.throw("Invalid OTP from Authenticator App.")

    frappe.local.login_manager = LoginManager()
    frappe.local.login_manager.user = email
    frappe.local.login_manager.post_login()

    return {
        "message": "Login successful",
        "full_name": frappe.utils.get_fullname(email),
        "user_type": user_type
    }


@frappe.whitelist(allow_guest=True)
def reset_user_totp(email):
    # if frappe.session.user != "Administrator" and frappe.session.user != email:
    #     frappe.throw("Not allowed")

    user = frappe.get_doc("User", email)
    user.otp_secret = pyotp.random_base32()
    user.save(ignore_permissions=True)

    otp_auth_url = pyotp.TOTP(user.otp_secret).provisioning_uri(
        name=email, issuer_name=frappe.get_system_settings("system_name")
    )

    return {
        "message": "TOTP reset successful",
        "otp_auth_url": otp_auth_url
    }

### share to the sales invoice report data to the salesperson
import frappe
import json

@frappe.whitelist()
def bulk_assign_salesperson_by_user(sales_invoices, user_email):
    if isinstance(sales_invoices, str):
        sales_invoices = json.loads(sales_invoices)

    if not frappe.db.exists("User", user_email):
        frappe.throw(f"User {user_email} does not exist.")

    for inv in sales_invoices:
        frappe.share.add("Sales Invoice", inv, user_email, read=1, write=0, share=0, everyone=0)

    frappe.db.commit()
    return "ok"


# Share Sales Orders
# so_names = frappe.get_all("Sales Order", filters={"customer": customer}, pluck="name")
# for so in so_names:
#     if so:
#         try:
#             frappe.share.add("Sales Order", so, user_email, read=1)
#         except Exception as e:
#             frappe.log_error(f"Failed to share Sales Order {so}: {str(e)}")

# Share Sales Invoices
# si_names = frappe.get_all("Sales Invoice", filters={"customer": customer}, pluck="name")
# for si in si_names:
#     if si:
#         try:
#             frappe.share.add("Sales Invoice", si, user_email, read=1)
#         except Exception as e:
#             frappe.log_error(f"Failed to share Sales Invoice {si}: {str(e)}")


# customer report to share permission to user 
import frappe
import json
from frappe import _

@frappe.whitelist()
def bulk_assign_customer_to_salesperson_by_user(customers, user_email):
    if isinstance(customers, str):
        customers = json.loads(customers)

    if not frappe.db.exists("User", user_email):
        frappe.throw(f"User {user_email} does not exist.")

    for customer in customers:
        if not frappe.db.exists("Customer", customer):
            frappe.msgprint(f"Customer {customer} does not exist, skipping.")
            continue

        # ✅ Update 'account_manager' field on Customer
        # try:
        #     frappe.db.set_value("Customer", customer, "account_manager", user_email)
        # except Exception as e:
        #     frappe.log_error(f"Failed to update account_manager for {customer}: {str(e)}")

        # ✅ Update 'account_manager' field on Customer
        try:
            frappe.db.set_value("Customer", customer, "account_manager", user_email)
        except Exception as e:
            frappe.log_error(f"Failed to update account_manager for {customer}", str(e))

        # ✅ Debugging block to trace Sales Team update issue
        try:
            # Step 1: Find Employee linked to user
            employee = frappe.db.get_value("Employee", {"user_id": user_email}, "name")
            if not employee:
                frappe.log_error("Sales Team Debug", f"No Employee linked to user: {user_email}")
                continue
            frappe.log_error("Sales Team Debug", f"Found Employee {employee} for user {user_email}")

            # Step 2: Find Sales Person linked to employee
            sales_person = frappe.db.get_value("Sales Person", {"employee": employee}, "name")
            if not sales_person:
                frappe.log_error("Sales Team Debug", f"No Sales Person linked to Employee {employee}")
                continue
            frappe.log_error("Sales Team Debug", f"Found Sales Person {sales_person} for Employee {employee}")

            # Step 3: Load and modify Customer doc
            customer_doc = frappe.get_doc("Customer", customer)
            frappe.log_error("Sales Team Debug", f"Loaded Customer Doc {customer}")

            # Step 4: Clear and update sales_team
            customer_doc.sales_team = []
            customer_doc.append("sales_team", {
                "sales_person": sales_person,
                "allocated_percentage": 100
            })
            frappe.log_error("Sales Team Debug", f"Updated sales_team with {sales_person} for {customer}")

            # Step 5: Save changes
            customer_doc.save(ignore_permissions=True)
            frappe.log_error("Sales Team Debug", f"Customer {customer} saved successfully")

        except Exception as e:
            frappe.log_error("Sales Team Update Error", f"Customer: {customer} | Error: {str(e)}")


        # Share the Customer
        try:
            frappe.share.add("Customer", customer, user_email, read=1)
        except Exception as e:
            frappe.log_error(f"Failed to share Customer {customer}: {str(e)}")

        # Share linked Contacts (via Dynamic Link)
        contact_names = frappe.db.sql("""
            SELECT DISTINCT dl.parent AS name
            FROM `tabDynamic Link` dl
            JOIN `tabContact` c ON c.name = dl.parent
            WHERE dl.link_doctype = 'Customer' AND dl.link_name = %s
        """, (customer,), as_dict=True)

        for cont in contact_names:
            try:
                frappe.share.add("Contact", cont.name, user_email, read=1)
            except Exception as e:
                frappe.log_error(f"Failed to share Contact {cont.name}: {str(e)}")

        # Share linked Addresses (via Dynamic Link)
        address_names = frappe.db.sql("""
            SELECT DISTINCT dl.parent AS name
            FROM `tabDynamic Link` dl
            JOIN `tabAddress` a ON a.name = dl.parent
            WHERE dl.link_doctype = 'Customer' AND dl.link_name = %s
        """, (customer,), as_dict=True)

        for addr in address_names:
            try:
                frappe.share.add("Address", addr.name, user_email, read=1)
            except Exception as e:
                frappe.log_error(f"Failed to share Address {addr.name}: {str(e)}")

        # Share Opportunities
        opportunity_names = frappe.get_all("Opportunity", filters={"party_name": customer}, pluck="name")
        for opp in opportunity_names:
            try:
                frappe.share.add("Opportunity", opp, user_email, read=1)
            except Exception as e:
                frappe.log_error(f"Failed to share Opportunity {opp}: {str(e)}")
                
        # Share Quotations
        quotations = frappe.get_all("Quotation", filters={"party_name": customer}, pluck="name")
        for quo in quotations:
            try:
                frappe.share.add("Quotation", quo, user_email, read=1)
            except Exception as e:
                frappe.log_error(f"Failed to share Quotation {quo}: {str(e)}")

        # Share Customer Order Forms (COFs)
        cofs = frappe.get_all("Customer Order Form", filters={"customer": customer}, pluck="name")
        for cof in cofs:
            try:
                frappe.share.add("Customer Order Form", cof, user_email, read=1)
            except Exception as e:
                frappe.log_error(f"Failed to share Customer Order Form {cof}: {str(e)}")

        # Share Renewal Lists
        renewals = frappe.get_all("Renewal List", filters={"customer_name": customer}, pluck="name")
        for renewal in renewals:
            try:
                frappe.share.add("Renewal List", renewal, user_email, read=1)
            except Exception as e:
                frappe.log_error(f"Failed to share Renewal List {renewal}: {str(e)}")

    frappe.db.commit()
    return "ok"




# issue send an email to customer with contact list 
import frappe
from frappe.utils import now_datetime, format_datetime

def send_issue_email(doc, method):
    print("Function called")

    if not doc.custom_issue_contact_list:
        print("No entries in Issue Contact List")
        return

    # Gather all email IDs from the child table
    email_list = []
    for row in doc.custom_issue_contact_list:
        if row.email_id:
            email_list.append(row.email_id)
            print(f"Found email: {row.email_id}")

    if not email_list:
        print("No valid email IDs found in Issue Contact List")
        return

    # Format times
    current_time = now_datetime()
    response_time = doc.response_by
    resolution_time = doc.resolution_by

    def fmt(dt):
        return format_datetime(dt, "dd-MM-yyyy hh:mm a") if dt else "N/A"

    # Message body
    # message = f"""
    # Dear Customer,<br><br>

    # Thank you for reaching out. We have received your support ticket.<br><br>

    # <b>Ticket ID:</b> {doc.name}<br>
    # <b>Subject:</b> {doc.subject}<br>
    # <b>Description:</b><br>{doc.description}<br><br>

    # Our support team received your ticket at <b>{fmt(current_time)}</b><br>
    # and will respond by <b>{fmt(response_time)}</b>.<br><br>

    # Resolution is expected by <b>{fmt(resolution_time)}</b>.<br><br>

    # Regards,<br>
    # Support Team
    # """

    message = f"""
        <html>
        <head>
        <style>
            body {{
            font-family: Arial, sans-serif;
            color: #333;
            font-size: 14px;
            line-height: 1.6;
            }}
            .email-container {{
            border: 1px solid #e0e0e0;
            padding: 20px;
            border-radius: 6px;
            background-color: #f9f9f9;
            max-width: 600px;
            }}
            .header {{
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 15px;
            }}
            .label {{
            font-weight: bold;
            }}
            .footer {{
            margin-top: 20px;
            font-size: 13px;
            color: #777;
            }}
        </style>
        </head>
        <body>
        <div class="email-container">
            <div class="header">Support Ticket Acknowledgement</div>

            <p>Dear Customer,</p>

            <p>Thank you for reaching out. We have received your support ticket.</p>

            <p>
            <span class="label">Ticket ID:</span> {doc.name}<br>
            <span class="label">Subject:</span> {doc.subject}<br>
            <span class="label">Description:</span><br>
            {doc.description}
            </p>

            <p>
            Our support team received your ticket at <b>{fmt(current_time)}</b><br>
            and will respond by <b>{fmt(response_time)}</b>.<br><br>
            Resolution is expected by <b>{fmt(resolution_time)}</b>.
            </p>

            <div class="footer">
            Regards,<br>
            Support Team
            </div>
        </div>
        </body>
        </html>
    """

    try:
        frappe.sendmail(
            recipients=email_list,
            subject=f"New Issue Created - {doc.name}",
            message=message,
            reference_doctype=doc.doctype,
            reference_name=doc.name
        )
        print(f"Email sent to: {', '.join(email_list)}")
    except Exception as e:
        print(f"Error sending email: {e}")
