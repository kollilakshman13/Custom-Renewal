frappe.pages['modern-menu'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Menu',
		single_column: true
	});
}