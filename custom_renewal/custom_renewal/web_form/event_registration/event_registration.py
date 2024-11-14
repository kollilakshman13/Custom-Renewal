# import frappe

# def get_context(context):
# 	# do your magic here
# 	pass


from __future__ import unicode_literals
import frappe

def get_context(context):
    # Fetch the document name from the query parameters
    # event_name = frappe.form_dict.get('event_name')
    event_name = frappe.form_dict.get('event')
    if event_name:
    
            # Fetch the Event document
            # event_doc = frappe.get_doc('Event', event_name)
            # Set the title based on the subject field of the Event document
            # context.title = event_doc.subject
            context.title = event_name

    else:
        # Log if no document name is provided in the query parameters
        frappe.log_error("No event_name provided in query parameters", "Event Page Error")
        context.title = "Event Registration"