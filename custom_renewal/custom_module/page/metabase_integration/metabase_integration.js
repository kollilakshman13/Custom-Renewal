// frappe.pages['metabase-integration'].on_page_load = function(wrapper) {
// 	var page = frappe.ui.make_app_page({
// 		parent: wrapper,
// 		title: 'Dash Board',
// 		single_column: true
// 	});
// }


frappe.pages['metabase-integration'].on_page_load = (wrapper) => {
	// init page
	const page = frappe.ui.make_app_page({
		'parent': wrapper,
		'title': 'Dash Board',
		'single_column': true,
	});

	new MetabaseDashboard(page, wrapper);
};

class MetabaseDashboard {
	constructor(page, wrapper) {
		this.currentDashboard = false;
		this.wrapper = wrapper;
		this.pageMain = $(page.main);
		this.pageAction = (
			$(this.wrapper)
				.find('div.page-head div.page-actions')
		);
		this.pageTitle = $(this.wrapper).find('div.title-text');

		this.init();
	}

	init() {
		this.createSelectionField();
	}

	showIframe() {
		this.getSettings().then(
			(r) => {
				// set variable
				this.settings = r.message;
				this.resizer = this.settings.resizer;
				this.iframeUrl = this.settings.iframeUrl;
				this.name = this.settings.name;

				if (this.iframeUrl && this.resizer) {
					// prepare html
					const iFrameHtml = `
						<script id="resizer" src="${this.resizer}"></script>
						<iframe
							src="${this.iframeUrl}"
							frameborder="0"
							width=100%
							onload="iFrameResize({}, this)"
							allowtransparency
						></iframe>
					`;

					// append html to page
					this.iFrame = $(iFrameHtml).appendTo(this.pageMain);
				}
			}
		);
	}


	getSettings() {
		return frappe.call({
			'method': 'metabase_integration.metabase_integration.doctype.metabase_dashboard.get_url',
			'args': {
				'dashboard': this.dashboardName,
			},
		});
	}

	createSelectionField() {
		// create dashboard selection field
		this.selectionField = frappe.ui.form.make_control({
			'parent': this.pageAction,
			'df': {
				'fieldname': 'Dashboard',
				'fieldtype': 'Link',
				'options': 'Metabase Dashboard',
				'onchange': () => {
					const dashboardName = this.selectionField.get_value();
					if (dashboardName) {
						this.dashboardName = dashboardName;
						if (this.currentDashboard != this.dashboardName) {
							// clear page html
							this.pageMain.empty();

							this.showIframe();
							this.changeTitle();

							// set current dashboard
							this.currentDashboard = this.dashboardName;
						}
						// clear input
						this.selectionField.set_input('');
					}
				},
				'get_query': () => {
					return {
						'filters': {
							'is_active': 1,
						},
					};
				},
				'placeholder': 'Select Dashboard',
			},
			'render_input': true,
		});

		// change css
		this.pageAction.removeClass('page-actions');
		this.selectionField.$wrapper.css('text-align', 'left');
	}

	changeTitle() {
		this.pageTitle.text(`${this.dashboardName} Dashboard`);
	}
}



// frappe.pages['metabase-integration'].on_page_load = (wrapper) => {

// 	// init page

// 	const page = frappe.ui.make_app_page({

// 		'parent': wrapper,

// 		'title': 'Dashboard',

// 		'single_column': true,

// 	});


// 	new MetabaseDashboard(page, wrapper);

// };


// class MetabaseDashboard {

// 	constructor(page, wrapper) {

// 		this.currentDashboard = false;

// 		this.wrapper = wrapper;

// 		this.pageMain = $(page.main);

// 		this.pageAction = (

// 			$(this.wrapper)

// 				.find('div.page-head div.page-actions')

// 		);

// 		this.pageTitle = $(this.wrapper).find('div.title-text');


// 		this.iframeLoaded = false;  // Track if iframe has been loaded


// 		this.init();

// 	}


// 	init() {

// 		this.createSelectionField();

// 	}







// 	showIframe() {


// 		// Check if iframe already exists

// 		if (this.iframeLoaded) {

// 			return;  // Prevent loading iframe if it already exists

// 		}


// 		this.getSettings().then(

// 			(r) => {

// 				// set variable

// 				this.settings = r.message;

// 				this.resizer = this.settings.resizer;

// 				this.iframeUrl = this.settings.iframeUrl;

// 				this.name = this.settings.name;



// 				if (this.iframeUrl && this.resizer) {

// 					// Define default filters here (replace with your actual filter criteria)

// 					const defaultFilters = {

// 						'sales_person': 'Kavitha Pindi', // Example filter (adjust for your actual filters)

// 					};



// 					// Convert default filters to URL query parameters

// 					const filterParams = new URLSearchParams(defaultFilters).toString();



// 					// Check if the URL already contains a fragment (i.e., the `#` symbol)

// 					if (this.iframeUrl.includes('#')) {

// 						// If there is a fragment, append filters using '&'

// 						const baseUrl = this.iframeUrl.split('#')[0]; // Get the part before the fragment

// 						const fragment = this.iframeUrl.split('#')[1]; // Get the fragment part



// 						// Append filters before the fragment

// 						const iframeUrlWithFilters = `${baseUrl}?${filterParams}&${fragment}`;

// 						this.iframeUrl = iframeUrlWithFilters; // Update iframe URL

// 					} else {

// 						// If there is no fragment, just append the filters as query parameters

// 						const iframeUrlWithFilters = `${this.iframeUrl}?${filterParams}`;

// 						this.iframeUrl = iframeUrlWithFilters; // Update iframe URL

// 					}



// 					// Prepare HTML with iframe and resizer

// 					const iFrameHtml = `

//                         <script id="resizer" src="${this.resizer}"></script>

//                         <iframe

//                             src="${this.iframeUrl}"

//                             frameborder="0"

//                             width="100%"

//                             onload="iFrameResize({}, this)"

//                             allowtransparency

//                         ></iframe>

//                     `;



// 					// Append HTML to page

// 					this.iFrame = $(iFrameHtml).appendTo(this.pageMain);


// 					// Mark iframe as loaded

// 					this.iframeLoaded = true;

// 				}

// 			}

// 		);

// 	}


// 	// showIframe() {

// 	//  this.getSettings().then((r) => {

// 	//      // Set iframe settings

// 	//      this.settings = r.message;

// 	//      this.resizer = this.settings.resizer;

// 	//      this.iframeUrl = this.settings.iframeUrl;

// 	//      this.name = this.settings.name;



// 	//      // Lock the sales_person filter to "Kavitha Pindi"

// 	//      const lockedSalesPerson = "Kavitha Pindi";



// 	//      if (this.iframeUrl && this.resizer) {

// 	//          // Append the locked filter value to the iframe URL

// 	//          const lockedUrl = `${this.iframeUrl}&sales_person=${encodeURIComponent(lockedSalesPerson)}`;



// 	//          // Create the iframe HTML

// 	//          const iFrameHtml = `

// 	//              <script id="resizer" src="${this.resizer}"></script>

// 	//              <iframe

// 	//                  src="${lockedUrl}"

// 	//                  frameborder="0"

// 	//                  width="100%"

// 	//                  onload="iFrameResize({}, this)"

// 	//                  allowtransparency

// 	//              ></iframe>

// 	//          `;



// 	//          // Append the iframe to the page

// 	//          this.iFrame = $(iFrameHtml).appendTo(this.pageMain);

// 	//      }

// 	//  });

// 	// }








// 	getSettings() {

// 		return frappe.call({

// 			'method': 'metabase_integration.metabase_integration.doctype.metabase_dashboard.get_url',

// 			'args': {

// 				'dashboard': this.dashboardName,

// 			},

// 		});

// 	}


// 	createSelectionField() {

// 		// create dashboard selection field

// 		this.selectionField = frappe.ui.form.make_control({

// 			'parent': this.pageAction,

// 			'df': {

// 				'fieldname': 'Dashboard',

// 				'fieldtype': 'Link',

// 				'options': 'Metabase Dashboard',

// 				'onchange': () => {

// 					const dashboardName = this.selectionField.get_value();

// 					if (dashboardName) {

// 						this.dashboardName = dashboardName;

// 						if (this.currentDashboard != this.dashboardName) {

// 							// clear page html

// 							this.pageMain.empty();

// 							this.iframeLoaded = false;  // Reset iframe load status


// 							this.showIframe();

// 							this.changeTitle();


// 							// set current dashboard

// 							this.currentDashboard = this.dashboardName;

// 						}

// 						// clear input

// 						this.selectionField.set_input('');

// 					}

// 				},

// 				'get_query': () => {

// 					return {

// 						'filters': {

// 							'is_active': 1,

// 						},

// 					};

// 				},

// 				'placeholder': 'Select Dashboard',

// 				// 'default': 'Sales Dashboard', // <-- Set the default value here

// 			},

// 			'render_input': true,

// 		});


// 		// Set the default value after the control is rendered

// 		this.setDefaultDashboard();


// 		// change css

// 		this.pageAction.removeClass('page-actions');

// 		this.selectionField.$wrapper.css('text-align', 'left');

// 	}


// 	setDefaultDashboard() {

// 		// Set a default dashboard if it's available in your system.

// 		const defaultDashboardName = 'Sales Dashboard'; // Replace with actual default name

// 		if (this.selectionField && defaultDashboardName) {

// 			this.selectionField.set_value(defaultDashboardName); // Manually set the value

// 			this.dashboardName = defaultDashboardName; // Update the dashboard name

// 			this.showIframe(); // Refresh the iframe with default filters

// 			this.changeTitle(); // Update title with default dashboard

// 		}

// 	}



// 	// showIframe() {

// 	//     this.getSettings().then((r) => {

// 	//         // Extract necessary settings

// 	//         this.settings = r.message;

// 	//         this.resizer = this.settings.resizer;

// 	//         this.iframeUrl = this.settings.iframeUrl;

// 	//         this.name = this.settings.name;


// 	//         if (this.iframeUrl && this.resizer) {

// 	//             // Define default filter values

// 	//             const defaultFilters = this.getDefaultFilters();


// 	//             // Check if the iframe URL already contains query parameters

// 	//             const separator = this.iframeUrl.includes('?') ? '&' : '?';


// 	//             // Construct the final URL with the filters

// 	//             const filteredIframeUrl = `${this.iframeUrl}${separator}${defaultFilters}`;


// 	//             // Prepare iframe HTML and append it to the page

// 	//             const iFrameHtml = `

// 	//                 <script id="resizer" src="${this.resizer}"></script>

// 	//                 <iframe

// 	//                     src="${filteredIframeUrl}"

// 	//                     frameborder="0"

// 	//                     width="100%"

// 	//                     onload="iFrameResize({}, this)"

// 	//                     allowtransparency

// 	//                 ></iframe>

// 	//             `;

// 	//          console.log(iFrameHtml)


// 	//             // Append HTML to the page

// 	//             this.iFrame = $(iFrameHtml).appendTo(this.pageMain);

// 	//         }

// 	//     });

// 	// }



// 	// getDefaultFilters() {

// 	//     // Example: Set default filters (e.g., by `sales_person` and `tab`)

// 	//     const defaultSalesPerson = 'Kavitha Pindi'; // Replace with your default sales person

// 	//     const defaultTab = '&tab=4-opportunity-insights'; // Replace with the default tab



// 	//     // Encode parameters to handle special characters and spaces

// 	//     const encodedSalesPerson = encodeURIComponent(defaultSalesPerson);

// 	//     const encodedTab = encodeURIComponent(defaultTab);


// 	//     // Construct the filter query parameters

// 	//     return `%3Fsales_person%3D${encodedSalesPerson}&tab=${encodedTab}`;

// 	// }









// 	changeTitle() {

// 		this.pageTitle.text(`${this.dashboardName} Dashboard`);

// 	}

// }


// frappe.pages['metabase-integration'].on_page_load = (wrapper) => {
// 	// init page
// 	const page = frappe.ui.make_app_page({

// 		'parent': wrapper,

// 		'title': 'Dashboard',

// 		'single_column': true,

// 	});
// 	new MetabaseDashboard(page, wrapper);
// };


// class MetabaseDashboard {
// 	constructor(page, wrapper) {

// 		this.currentDashboard = false;

// 		this.wrapper = wrapper;

// 		this.pageMain = $(page.main);

// 		this.pageAction = (

// 			$(this.wrapper)

// 				.find('div.page-head div.page-actions')

// 		);

// 		this.pageTitle = $(this.wrapper).find('div.title-text');


// 		this.iframeLoaded = false;  // Track if iframe has been loaded


// 		this.init();

// 	}


// 	init() {

// 		this.createSelectionField();

// 	}

// 	showIframe() {


// 		// Check if iframe already exists

// 		if (this.iframeLoaded) {

// 			return;  // Prevent loading iframe if it already exists

// 		}


// 		this.getSettings().then(

// 			(r) => {

// 				// set variable

// 				this.settings = r.message;

// 				this.resizer = this.settings.resizer;

// 				this.iframeUrl = this.settings.iframeUrl;

// 				this.name = this.settings.name;



// 				if (this.iframeUrl && this.resizer) {

// 					// Define default filters here (replace with your actual filter criteria)

// 					const defaultFilters = {

// 						//'sales_person': 'Kavitha Pindi', // Example filter (adjust for your actual filters)
// 						'sales_person': 'kavitha.p@64network.com',
// 					};
// 					// Convert default filters to URL query parameters

// 					const filterParams = new URLSearchParams(defaultFilters).toString();



// 					// Check if the URL already contains a fragment (i.e., the `#` symbol)

// 					if (this.iframeUrl.includes('#')) {

// 						// If there is a fragment, append filters using '&'

// 						const baseUrl = this.iframeUrl.split('#')[0]; // Get the part before the fragment

// 						const fragment = this.iframeUrl.split('#')[1]; // Get the fragment part



// 						// Append filters before the fragment

// 						const iframeUrlWithFilters = `${baseUrl}?${filterParams}&${fragment}`;

// 						this.iframeUrl = iframeUrlWithFilters; // Update iframe URL

// 					} else {

// 						// If there is no fragment, just append the filters as query parameters

// 						const iframeUrlWithFilters = `${this.iframeUrl}?${filterParams}`;

// 						this.iframeUrl = iframeUrlWithFilters; // Update iframe URL

// 					}



// 					// Prepare HTML with iframe and resizer

// 					const iFrameHtml = `

//                         <script id="resizer" src="${this.resizer}"></script>

//                         <iframe

//                             src="${this.iframeUrl}"

//                             frameborder="0"

//                             width="100%"

//                             onload="iFrameResize({}, this)"

//                             allowtransparency

//                         ></iframe>

//                     `;



// 					// Append HTML to page

// 					this.iFrame = $(iFrameHtml).appendTo(this.pageMain);


// 					// Mark iframe as loaded

// 					this.iframeLoaded = true;

// 				}

// 			}

// 		);

// 	}

// 	getSettings() {

// 		return frappe.call({

// 			'method': 'metabase_integration.metabase_integration.doctype.metabase_dashboard.get_url',

// 			'args': {

// 				'dashboard': this.dashboardName,

// 			},

// 		});

// 	}


// 	createSelectionField() {

// 		// create dashboard selection field

// 		this.selectionField = frappe.ui.form.make_control({

// 			'parent': this.pageAction,

// 			'df': {

// 				'fieldname': 'Dashboard',

// 				'fieldtype': 'Link',

// 				'options': 'Metabase Dashboard',

// 				'onchange': () => {

// 					const dashboardName = this.selectionField.get_value();

// 					if (dashboardName) {

// 						this.dashboardName = dashboardName;

// 						if (this.currentDashboard != this.dashboardName) {

// 							// clear page html

// 							this.pageMain.empty();

// 							this.iframeLoaded = false;  // Reset iframe load status


// 							this.showIframe();

// 							this.changeTitle();


// 							// set current dashboard

// 							this.currentDashboard = this.dashboardName;

// 						}

// 						// clear input

// 						this.selectionField.set_input('');

// 					}

// 				},

// 				'get_query': () => {

// 					return {

// 						'filters': {

// 							'is_active': 1,

// 						},

// 					};

// 				},

// 				'placeholder': 'Select Dashboard',

// 				// 'default': 'Sales Dashboard', // <-- Set the default value here

// 			},

// 			'render_input': true,

// 		});


// 		// Set the default value after the control is rendered

// 		this.setDefaultDashboard();


// 		// change css

// 		this.pageAction.removeClass('page-actions');

// 		this.selectionField.$wrapper.css('text-align', 'left');

// 	}


// 	setDefaultDashboard() {

// 		// Set a default dashboard if it's available in your system.

// 		const defaultDashboardName = 'Sales Dashboard'; // Replace with actual default name

// 		if (this.selectionField && defaultDashboardName) {

// 			this.selectionField.set_value(defaultDashboardName); // Manually set the value

// 			this.dashboardName = defaultDashboardName; // Update the dashboard name

// 			this.showIframe(); // Refresh the iframe with default filters

// 			this.changeTitle(); // Update title with default dashboard

// 		}

// 	}


// 	changeTitle() {

// 		this.pageTitle.text(`${this.dashboardName} Dashboard`);

// 	}

// }



// class MetabaseDashboard {
//     constructor(page, wrapper) {
//         this.currentDashboard = false;
//         this.wrapper = wrapper;
//         this.pageMain = $(page.main);
//         this.pageAction = $(this.wrapper).find('div.page-head div.page-actions');
//         this.pageTitle = $(this.wrapper).find('div.title-text');
//         this.iframeLoaded = false; // Track if iframe has been loaded
//         this.defaultSalesPerson = 'kavitha.p@64network.com'; // Default Sales Person
//         this.init();
//     }

//     init() {
//         this.createDashboardSelectionField(); // Create dashboard selection dropdown
//         this.createNonEditableSalesPersonField(); // Create static Sales Person field
//     }

//     showIframe() {
//         if (this.iframeLoaded) return; // Prevent loading iframe if it already exists

//         this.getSettings().then((r) => {
//             this.settings = r.message;
//             this.resizer = this.settings.resizer;
//             this.iframeUrl = this.settings.iframeUrl;
//             this.name = this.settings.name;

//             if (this.iframeUrl && this.resizer) {
//                 // Apply default Sales Person filter
//                 const defaultFilters = { sales_person: this.defaultSalesPerson };
//                 const filterParams = new URLSearchParams(defaultFilters).toString();

//                 // Handle URLs with or without fragments (#)
//                 if (this.iframeUrl.includes('#')) {
//                     const [baseUrl, fragment] = this.iframeUrl.split('#');
//                     this.iframeUrl = `${baseUrl}?${filterParams}#${fragment}`;
//                 } else {
//                     this.iframeUrl = `${this.iframeUrl}?${filterParams}`;
//                 }

//                 // Append iframe to the page
//                 const iFrameHtml = `
//                     <script id="resizer" src="${this.resizer}"></script>
//                     <iframe
//                         src="${this.iframeUrl}"
//                         frameborder="0"
//                         width="100%"
//                         onload="iFrameResize({}, this)"
//                         allowtransparency
//                     ></iframe>
//                 `;

//                 this.iFrame = $(iFrameHtml).appendTo(this.pageMain);
//                 this.iframeLoaded = true;
//             }
//         });
//     }

//     getSettings() {
//         return frappe.call({
//             method: 'metabase_integration.metabase_integration.doctype.metabase_dashboard.get_url',
//             args: {
//                 dashboard: this.dashboardName,
//             },
//         });
//     }

//     createDashboardSelectionField() {
//         // Create dashboard selection field
//         this.selectionField = frappe.ui.form.make_control({
//             parent: this.pageAction,
//             df: {
//                 fieldname: 'Dashboard',
//                 fieldtype: 'Link',
//                 options: 'Metabase Dashboard',
//                 onchange: () => {
//                     const dashboardName = this.selectionField.get_value();
//                     if (dashboardName) {
//                         this.dashboardName = dashboardName;
//                         if (this.currentDashboard != this.dashboardName) {
//                             // Clear page HTML
//                             this.pageMain.empty();
//                             this.iframeLoaded = false; // Reset iframe load status
//                             this.showIframe();
//                             this.changeTitle();
//                             // Set current dashboard
//                             this.currentDashboard = this.dashboardName;
//                         }
//                         // Clear input
//                         this.selectionField.set_input('');
//                     }
//                 },
//                 get_query: () => {
//                     return {
//                         filters: {
//                             is_active: 1,
//                         },
//                     };
//                 },
//                 placeholder: 'Select Dashboard',
//             },
//             render_input: true,
//         });

//         // Set the default dashboard
//         this.setDefaultDashboard();

//         // Adjust CSS
//         this.pageAction.removeClass('page-actions');
//         this.selectionField.$wrapper.css('text-align', 'left');
//     }

//     createNonEditableSalesPersonField() {
//         // Create a non-editable Sales Person field
//         const staticFieldHtml = `
//             <div style="display: flex; align-items: center; margin-top: 10px;">
//                 <label style="margin-right: 10px; font-weight: bold;">Sales Person:</label>
//                 <span style="background: #f0f0f0; padding: 5px 10px; border-radius: 5px;">
//                     ${this.defaultSalesPerson}
//                 </span>
//             </div>
//         `;

//         // Append the field to the page actions
//         this.pageAction.append(staticFieldHtml);
//     }

//     setDefaultDashboard() {
//         // Set a default dashboard if available in your system
//         const defaultDashboardName = 'Sales Dashboard'; // Replace with actual default name
//         if (this.selectionField && defaultDashboardName) {
//             this.selectionField.set_value(defaultDashboardName); // Manually set the value
//             this.dashboardName = defaultDashboardName; // Update the dashboard name
//             this.showIframe(); // Refresh the iframe with default filters
//             this.changeTitle(); // Update title with default dashboard
//         }
//     }

//     changeTitle() {
//         this.pageTitle.text(`${this.dashboardName} Dashboard`);
//     }
// }


