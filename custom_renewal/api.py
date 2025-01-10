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



