frappe.pages['programming_page'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		 title: 'Demo-Dashboard ',
		single_column: true
	});


// page.set_title('My Page')

//  let $btn = page.set_primary_action('New', ()=>frappe.msgprint("Clicked New"))
//  let $btnOne = page.set_secondary_action('Refresh', ()=>frappe.msgprint("clicked refresh"))
//  page.add_menu_item('send Email', ()=>frappe.msgprint('Clicked send email'))
//  page.add_action_item('Delete',()=>frappe.msgprint('Clicked Delete'))

// let field =page.add_field({
// 	label:'status',
// 	fieldtype: 'select',
// 	fieldname:'status',
// 	options :[
// 	   'open',
// 	   'closed',
// 	   'Cancelled'
// 	],
// 	change () {
// 		frappe.msgprint(field.get_value());
// 	}
// });

$(frappe.render_template("programming_page", {})).appendTo(page.body);

//  $(frappe.render_template("programming_page", {
//  	data: "Hi Vicky"
//  })).appendTo(page.body);

}