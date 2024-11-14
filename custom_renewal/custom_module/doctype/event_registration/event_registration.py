# Copyright (c) 2024, lakshman and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document

class EventRegistration(Document):
	pass


# from frappe.model.document import Document
# import frappe
# import pytz
# import datetime
# import textwrap

# class EventRegistration(Document):
#     pass

# def email_on_approval(doc, method):
#     frappe.msgprint("Approval function triggered")
#     frappe.msgprint(f"Current Workflow State: '{doc.workflow_state}'")

#     if doc.workflow_state == 'Approved' and not doc.email_sent:
#         frappe.msgprint("Sales user approved")
#         send_approval_email(doc)

#         # Correct indentation
#         doc.email_sent = True
#         doc.save()

# def send_approval_email(doc):
#     frappe.msgprint("Sending email")
#     event_doc = frappe.get_doc("Event", doc.event_name)
    
#     # Ensure that event_doc is valid
#     if not event_doc:
#         frappe.throw(f"Event '{doc.event_name}' not found.")
    
#     event_link = event_doc.custom_link_
#     event_venue = event_doc.custom_venue
#     event_subject = event_doc.subject
#     starts_on = event_doc.starts_on
#     ends_on = event_doc.ends_on #or (starts_on + datetime.timedelta(hours=2))  # Set default end time to 2 hours later if not provided

#     # Ensure datetime objects are timezone-aware
#     # if starts_on.tzinfo is None:
#     #     starts_on = pytz.UTC.localize(starts_on)
#     # if ends_on.tzinfo is None:
#     #     ends_on = pytz.UTC.localize(ends_on)

#     # ist_timezone = pytz.timezone('Asia/Kolkata')
#     # starts_on_ist = starts_on.astimezone(ist_timezone)
#     formatted_date = starts_on.strftime('%A, %B %d, %Y')
#     formatted_time = starts_on.strftime('%I:%M %p IST')
#     recipients = [doc.email]
#     subject = f"Event Approved: {event_subject}"

#     # Create ICS content for the calendar event
#     ics_content = create_ics_event(event_subject, event_venue, starts_on, ends_on)
    
#     # Debug: Print ICS content
#     frappe.msgprint(f"ICS Content:\n{ics_content}")

#     # Write the ICS file to attach it to the email (optional)
#     ics_file_name = f"{event_subject.replace(' ', '_')}.ics"
#     ics_file_path = f"/tmp/{ics_file_name}"

#     with open(ics_file_path, "w") as ics_file:
#         ics_file.write(ics_content)

#     if event_link:
#         message = f"""
#             <div style="font-family:Arial,sans-serif;margin:0;padding:0;background-color:#f4f4f4;">
#                 <div style="width:100%;max-width:600px;margin:10px auto;background-color:#ffffff;padding:20px;border-radius:8px;box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
#                     <div style="background-color:#EA8300;padding:5px;color:#ffffff;justify-content:space-between;">
#                         <h2 style="text-align:center">64Network Security Pvt Ltd</h2>
#                         <h2 style="text-align:center">{event_subject}</h2>
#                     </div>

#                     <div style="margin:20px 0;">
#                         <h3 style="color:#333333;">Thank you for registering!</h3>
#                         <p style="color:#666666;line-height:1.5;">Save this email for webcast details.</p>
#                         <p style="color:#666666;line-height:1.5;">Live Webcast Date: {formatted_date}</p>
#                         <p style="color:#666666;line-height:1.5;">Live Webcast Time: {formatted_time}</p>
#                         <p style="color:#666666;line-height:1.5;">Join the webcast using the link below:</p>
#                         <p style="color:#666666;line-height:1.5;"><strong>Webcast Link:</strong> <a href="{event_link}" style="color:#1a73e8;text-decoration:none;">{event_link}</a></p>
#                         <p style="color:#666666;line-height:1.5;">Thank you and enjoy the webcast!</p>
#                     </div>

#                     <div style="padding:10px 20px; background-color:#f4f4f4;border-bottom-left-radius:8px;border-bottom-right-radius:8px;text-align:center;color:#888888;font-size:12px;">
#                         <p style="margin:0;">&copy;2024 64 Network Pvt Ltd. All rights reserved.</p>
#                     </div>
#                 </div>
#             </div>
#         """
#     elif event_venue:
#         message = f"""
#             <div style="font-family:Arial,sans-serif;margin:0;padding:0;background-color:#f4f4f4;">
#                 <div style="width:100%;max-width:600px;margin:10px auto;background-color:#ffffff;padding:20px;border-radius:8px;box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
#                     <div style="background-color:#EA8300;padding:5px;color:#ffffff;justify-content:space-between;">
#                         <h2 style="text-align:center">64Network Security Pvt Ltd</h2>
#                         <h2 style="text-align:center">{event_subject}</h2>
#                     </div>

#                     <div style="margin:20px 0;">
#                         <h3 style="color:#333333;">Thank you for registering!</h3>
#                         <p style="color:#666666;line-height:1.5;">Event Date: {formatted_date}</p>
#                         <p style="color:#666666;line-height:1.5;">Event Time: {formatted_time}</p>
#                         <p style="color:#666666;line-height:1.5;">Venue: {event_venue}</p>
#                         <p style="color:#666666;line-height:1.5;">We hope you enjoy the event!</p>
#                     </div>

#                     <div style="padding:10px 20px; background-color:#f4f4f4;border-bottom-left-radius:8px;border-bottom-right-radius:8px;text-align:center;color:#888888;font-size:12px;">
#                         <p style="margin:0;">&copy;2024 64 Network Pvt Ltd. All rights reserved.</p>
#                     </div>
#                 </div>
#             </div>
#         """
#     else:
#         message = f"Thank you for registering."

#     # Send the email with the ICS file attachment
#     frappe.sendmail(
#         recipients=recipients,
#         subject=subject,
#         message=message,
#         attachments=[{
#             'fname': ics_file_name,
#             'fcontent': ics_content,
#         }]
#     )

# def create_ics_event(subject, venue, start, end):
#     """
#     Create ICS file content for calendar event
#     """
#     start_utc = start.astimezone(pytz.UTC)
#     end_utc = end.astimezone(pytz.UTC)
    
#     ics_template = f"""BEGIN:VCALENDAR
# VERSION:2.0
# PRODID:-//64Network Security Pvt Ltd//Event Calendar//EN
# CALSCALE:GREGORIAN
# METHOD:PUBLISH
# BEGIN:VEVENT
# SUMMARY:{subject}
# DESCRIPTION:Join us for the event {subject}.
# DTSTART:{start_utc.strftime('%Y%m%dT%H%M%SZ')}
# DTEND:{end_utc.strftime('%Y%m%dT%H%M%SZ')}
# LOCATION:{venue}
# END:VEVENT
# END:VCALENDAR
# """
#     # Remove any leading indentation
#     return textwrap.dedent(ics_template)



# DTSTART:{start.strftime('%Y%m%dT%H%M%SZ')}
# DTEND:{end.strftime('%Y%m%dT%H%M%SZ')}






# event_registration.py
##event name series code 
# def autoname(self, *args, **kwargs):
#     # Construct the name as per the event_name and series
#     if self.event_name:
#         last_series_number = get_last_series(self.event_name)
#         new_series_number = last_series_number + 1 if last_series_number else 1
#         self.name = f"{self.event_name}-{new_series_number:04d}"

# def get_last_series(event_name):
#     # Get the last used series for the specified event_name
#     last_doc = frappe.get_all(
#         "Event Registration",
#         filters={"event_name": event_name},
#         fields=["name"],
#         order_by="name desc",  # Get the highest series number for this event_name
#         limit=1
#     )
    
#     if last_doc:
#         # Extract the last series number from the document name
#         last_name = last_doc[0]["name"]
#         last_series_number = int(last_name.split('-')[-1])
#         return last_series_number
#     return None







import frappe
from frappe.utils import get_time, get_datetime

def set_event_times(doc, method):
    if doc.event:
        # Fetch starts_on and ends_on from the Event doctype
        event = frappe.get_value("Event", doc.event, ["starts_on", "ends_on"], as_dict=True)
        
        if event:
            # Extract time part from starts_on and ends_on, if they exist
            if event.starts_on:
                doc.event_start_time = get_time(event.starts_on)
                doc.event_start_date = get_datetime(event.starts_on).date()
            
            if event.ends_on:
                doc.event_end_time = get_time(event.ends_on)
                doc.event_end_date = get_datetime(event.ends_on).date()