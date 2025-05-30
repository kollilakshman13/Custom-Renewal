app_name = "custom_renewal"
app_title = "Custom Renewal"
app_publisher = "lakshman"
app_description = "custom renewals of modules "
app_email = "kollilakshman13@gmail.com"
app_license = "MIT"

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
app_include_css = "/assets/custom_renewal/css/custom_renewal.css"
#app_include_css = "/assets/css/font-awesome.css"
# app_include_js = "/assets/custom_renewal/js/custom_renewal.js"
app_include_js = "/assets/custom_renewal/js/page.js"

# app_include_css = ["/assets/custom_renewal/css/theme.css","/assets/custom_module/css/menu.css"]
# app_include_js = ["/assets/custom_renewal/js/theme.js",
#                     "/assets/custom_renewal/js/menu/router.js",
#                     "/assets/custom_renewal/js/menu/page.js",
#                     "/assets/custom_renewal/js/menu/workspace.js"
# ]

# include js, css files in header of web template
web_include_css = "/assets/custom_renewal/css/custom_renewal_website.css"
# web_include_js = "/assets/custom_renewal/js/custom_renewal.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "custom_renewal/public/scss/website"

website_route_rules = [
    { "from_route":"/renewal_list","to_route":"renewal_list" },
    {
        "from_route":"/renewal_list/<path:name>",
        "to_route":"/renewal_list",
        "defaults":{
            "doctype":"Renewal List",
            "parents":[{"label":"Renewal List","route":"renewal_list"}]
        }
    },
    {
        "from_route": "/sales_order", "to_route": "sales_order"
    },
    {
        "from_route": "/sales_order/<path:name>",
        "to_route": "sales_order",
        "defaults": {
            "doctype": "Sales Order",
            "parents": [
                {
                    "label": "Sales Order",
                    "route": "sales_order"
                }
            ]
        }
    },
    {
        "from_route": "/sales_invoice", "to_route": "sales_invoice"
    },
    {
        "from_route": "/sales_invoice/<path:name>",
        "to_route": "sales_invoice",
        "defaults": {
            "doctype": "Sales Invoice",
            "parents": [
                {
                    "label": "Sales Invoice",
                    "route": "sales_invoice"
                }
            ]
        }
    },
    {
        "from_route": "/issue", "to_route": "issue"
    },
    {
        "from_route": "/isssue/<path:name>",
        "to_route": "issue",
        "defaults": {
            "doctype": "Issue",
            "parents": [
                {
                    "label": "Issue",
                    "route": "issue"
                }
            ]
        }
    },
    {
        "from_route": "/address_list", "to_route": "address_list"
    },
    {
        "from_route": "/address_list/<path:name>",
        "to_route": "address",
        "defaults": {
            "doctype": "Address",
            "parents": [
                {
                    "label": "Address",
                    "route": "address_list"
                }
            ]
        }
    },
    {
        "from_route": "/tickets", "to_route": "tickets"
    },
    
    
]
website_context = {
    "web_sidebar": "custom_renewal/templates/includes/web_sidebar.html",
    "web_sidebar1": "custom_renewal/templates/includes/web_sidebar1.html",
    "renewal_list":"custom_renewal/templates/includes/renewal_list1.html",
    "override_doctype_templates": {
        "me": "custom_renewal/www/me.html",
        "address":"custom_renewal/www/address.html",
        "order": "custom_renewal/templates/pages/order.html",
        "filters":"custom_renewal/templates/list/filters.html"
    },
}


website_route_rules = [
    {"from_route": "/address", "to_route": "custom_renewal/www/address"},
    {"from_route": "/fixed_sidebar/<path:path>", "to_route": "fixed_sidebar"},
]


# hooks.py
# override_whitelisted_methods = {
#     "custom_renewal.api.create_issue": "custom_renewal.api.create_issue"
# }


# override_doctype_class = {
#     "Website Sidebar": "custom_renewal_module.overrides.website_sidebar.CustomWebsiteSidebar"
# }


# website_context = {
#     "web_sidebar": "custom_renewal/templates/includes/web_sidebar.html",
#     "override_doctype_templates": {
#         "Order": "custom_renewal/templates/pages/order.html",
#     },
#     "templates": {
#         "me": "custom_renewal/www/me.html",
#         "invoices":"custom_renewal/templates/includes/sales_invoice/invoicess.html",
#         # "list":"custom_renewal/templates/list/list.html"
#     }
# }


# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
# 	"Role": "home_page"
# }
# role_home_page = {
#     "Customer": "/me",  # Redirect users with the "Customer" role to the /me page
# }


# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Jinja
# ----------

# add methods and filters to jinja environment
# jinja = {
# 	"methods": "custom_renewal.utils.jinja_methods",
# 	"filters": "custom_renewal.utils.jinja_filters"
# }

# Installation
# ------------

# before_install = "custom_renewal.install.before_install"
# after_install = "custom_renewal.install.after_install"

# Uninstallation
# ------------

# before_uninstall = "custom_renewal.uninstall.before_uninstall"
# after_uninstall = "custom_renewal.uninstall.after_uninstall"

# Integration Setup
# ------------------
# To set up dependencies/integrations with other apps
# Name of the app being installed is passed as an argument

# before_app_install = "custom_renewal.utils.before_app_install"
# after_app_install = "custom_renewal.utils.after_app_install"

# Integration Cleanup
# -------------------
# To clean up dependencies/integrations with other apps
# Name of the app being uninstalled is passed as an argument

# before_app_uninstall = "custom_renewal.utils.before_app_uninstall"
# after_app_uninstall = "custom_renewal.utils.after_app_uninstall"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "custom_renewal.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }
# has_permission = {
#     "Quotation": "custom_renewal.api.has_permission"
# }


# DocType Class
# ---------------
# Override standard doctype classes

# override_doctype_class = {
# 	"ToDo": "custom_app.overrides.CustomToDo"
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
# 	}
# }


doc_events = {
    # "Event Registration": {
        
    #     "on_update":"custom_renewal.custom_module.doctype.event_registration.event_registration.email_on_approval",
    #     #"autoname":"custom_renewal.custom_module.doctype.event_registration.event_registration.autoname"
    
    # },
    # "Quotation":{ 
    #     "on_update":"custom_renewal.api.update_margin_table"
    # },
    "Event Registration":{
        "before_save":"custom_renewal.custom_module.doctype.event_registration.event_registration.set_event_times"
    }
}
# doc_events = {
#     "Event Registration": {
        
#         "on_update":"custom_renewal.api.email_on_approval"
#     }
# }


# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"custom_renewal.tasks.all"
# 	],
# 	"daily": [
# 		"custom_renewal.tasks.daily"
# 	],
# 	"hourly": [
# 		"custom_renewal.tasks.hourly"
# 	],
# 	"weekly": [
# 		"custom_renewal.tasks.weekly"
# 	],
# 	"monthly": [
# 		"custom_renewal.tasks.monthly"
# 	],
# }

# Testing
# -------

# before_tests = "custom_renewal.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "custom_renewal.event.get_events"
# }
#
override_whitelisted_methods = {
    "frappe.core.doctype.user.user.switch_theme": "custom_renewal.overrides.switch_theme.switch_theme"
}

# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
# 	"Task": "custom_renewal.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]

# Ignore links to specified DocTypes when deleting documents
# -----------------------------------------------------------

# ignore_links_on_delete = ["Communication", "ToDo"]

# Request Events
# ----------------
# before_request = ["custom_renewal.utils.before_request"]
# after_request = ["custom_renewal.utils.after_request"]

# Job Events
# ----------
# before_job = ["custom_renewal.utils.before_job"]
# after_job = ["custom_renewal.utils.after_job"]

# User Data Protection
# --------------------

# user_data_fields = [
# 	{
# 		"doctype": "{doctype_1}",
# 		"filter_by": "{filter_by}",
# 		"redact_fields": ["{field_1}", "{field_2}"],
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_2}",
# 		"filter_by": "{filter_by}",
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_3}",
# 		"strict": False,
# 	},
# 	{
# 		"doctype": "{doctype_4}"
# 	}
# ]

# Authentication and authorization
# --------------------------------

# auth_hooks = [
# 	"custom_renewal.auth.validate"
# ]
