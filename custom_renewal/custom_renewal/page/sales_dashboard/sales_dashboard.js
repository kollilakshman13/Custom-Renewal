// frappe.pages['sales-dashboard'].on_page_load = function (wrapper) {
// 	var page = frappe.ui.make_app_page({
// 		parent: wrapper,
// 		title: 'Employee Dashboard',
// 		single_column: true
// 	});
// }

// frappe.pages['sales-dashboard'].on_page_load = function (wrapper) {
// 	var page = frappe.ui.make_app_page({
// 		parent: wrapper,
// 		title: 'Employee Dashboard',
// 		single_column: true
// 	});

// 	let $content = $(
// 		`<div>
//             <ul class="nav nav-tabs">
//                 <li class="nav-item">
//                     <a class="nav-link active" href="#" data-dashboard="opportunity">Opportunity Dashboard</a>
//                 </li>
//                 <li class="nav-item">
//                     <a class="nav-link" href="#" data-dashboard="target">Target Dashboard</a>
//                 </li>
//             </ul>
//             <div id="dashboard-content" class="mt-3">
//                 <p>Loading Opportunity Dashboard...</p>
//             </div>
//         </div>`
// 	);

// 	$(page.body).append($content);

// 	function load_dashboard(type) {
// 		let content_html = "";
// 		if (type === "opportunity") {
// 			content_html = `
// 				<h3>Opportunity Dashboard</h3>
// 				<p>Details about opportunities...</p>
// 				<div class="row">
// 					<div class="col-12 col-md-12 col-lg-10">
// 						<div id="sales-overview" style="width: 100%;"></div>
// 					</div>
// 					<div class="col-12 col-md-12 col-lg-2">
// 						<div class="row">
// 							<div class="col-6 col-md-4 col-lg-12 mb-2">
// 								<div class="widget number-widget-box" data-widget-name="Opp Count(TM)">
// 									<div class="widget-head">
// 										<div class="widget-label">
// 											<div class="widget-title">
// 												<span class="ellipsis" title="Opp Count(TM)">
// 													<a href="#" target="_blank">
// 													Opp Count(TM)
// 													</a>
// 												</span>
// 											</div>
// 										</div>
// 										<div class="widget-control hidden">
// 											<div class="card-actions dropdown pull-right">
// 												<a data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
// 												...
// 												</a>
// 												<ul class="dropdown-menu" style="max-height: 300px; overflow-y: auto;">
// 													<li class="dropdown1-item">
// 														<a data-action="action-refresh">Refresh</a>
// 														</li><li class="dropdown1-item">
// 														<a data-action="action-edit">Edit</a>
// 													</li>
// 												</ul>
// 											</div>
// 										</div>
// 									</div>
// 									<div class="widget-body">
// 										<div class="widget-content">
// 											<div class="number ellipsis blue" id="opp-count_tm">0</div>
// 										</div>
// 									</div>
// 								</div>
// 							</div>	

// 							<div class="col-6 col-md-4 col-lg-12 mb-2">
// 								<div class="widget number-widget-box" data-widget-name="Closed Won(TM)">
// 									<div class="widget-head">
// 										<div class="widget-label">
// 											<div class="widget-title">
// 												<span class="ellipsis" title="Closed Won(TM)">
// 													<a href="/app/sales-funnel">
// 													Closed Won (TM)
// 													</a>
// 												</span>
// 											</div>
// 										</div>
// 										<div class="widget-control hidden">
// 											<div class="card-actions dropdown pull-right">
// 												<a data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
// 												...
// 												</a>
// 												<ul class="dropdown-menu" style="max-height: 300px; overflow-y: auto;">
// 													<li class="dropdown1-item">
// 														<a data-action="action-refresh">Refresh</a>
// 														</li><li class="dropdown1-item">
// 														<a data-action="action-edit">Edit</a>
// 													</li>
// 												</ul>
// 											</div>
// 										</div>
// 									</div>
// 									<div class="widget-body">
// 										<div class="widget-content">
// 											<div class="number green ellipsis" id="closed-amount_tm">₹0</div>
// 										</div>
// 									</div>
// 								</div>
// 							</div>	

// 							<div class="col-6 col-md-4 col-lg-12 mb-2">
// 								<div class="widget number-widget-box" data-widget-name="Closed Lost(TM)">
// 									<div class="widget-head">
// 										<div class="widget-label">
// 											<div class="widget-title">
// 												<span class="ellipsis" title="Closed Lost(TM)">
// 												<a href="/app/sales-funnel">
// 													Closed Lost(TM)
// 												</a>	
// 												</span>
// 											</div>
// 										</div>
// 										<div class="widget-control hidden">
// 											<div class="card-actions dropdown pull-right">
// 												<a data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
// 												...
// 												</a>
// 												<ul class="dropdown-menu" style="max-height: 300px; overflow-y: auto;">
// 													<li class="dropdown1-item">
// 														<a data-action="action-refresh">Refresh</a>
// 														</li><li class="dropdown1-item">
// 														<a data-action="action-edit">Edit</a>
// 													</li>
// 												</ul>
// 											</div>
// 										</div>
// 									</div>
// 									<div class="widget-body">
// 										<div class="widget-content">
// 											<div class="number ellipsis red" id="lost-amount_tm">₹ 0.00</div>
// 										</div>
// 									</div>
// 								</div>
// 							</div>
// 						</div>	
// 					</div>
// 				</div>	
// 			`;
// 		} else if (type === "target") {
// 			content_html = `
// 				<h3>Target Dashboard</h3><p>Details about targets...</p>
// 				<div class="row mt-5">
// 					<div class="col-12 col-md-6 col-lg-6 mb-5 mb-xxl-6">
// 						<div class="card1 card1-flush">
// 							<div class="card1-header">
// 								<div class="card1-title d-flex1 flex-column1">
// 									<span class="text-gray-500 pt-1 fw-semibold fs-6"><a href="/#" target="_blank">Brand Wise Sales Amount</a></span>
// 								</div>
// 							</div>
// 							<div class="card1-body d-flex1 align-items-center" style="height:280px;">
// 								<div class="d-flex1 flex-center1 me-5">
// 									<div id="brand_donut_chart" style="min-width: 250px; min-height: 250px" data-kt-size="250"
// 										data-kt-line="18">
// 									</div>
// 								</div>
// 								<div class="d-flex1 flex-column1 content-justify-center w-100">
// 									<div id="brand_legend"></div>
// 								</div>
// 							</div>
// 						</div>
// 					</div>

// 					<div class="col-12 col-md-6 col-lg-6 mb-5 mb-xxl-10">
// 						<div class="card1 card1-flush">
// 							<div class="card1-header">
// 								<div class="card1-title d-flex1 flex-column1">
// 									<span class="text-gray-500 pt-1 fw-semibold fs-6"><a href="#" target="_blank">Item Group Wise Sales Amount</a></span>
// 								</div>
// 							</div>
// 							<div class="card1-body d-flex1 align-items-center" style="height:280px;">
// 								<div class="d-flex1 flex-center11 me-5">
// 									<div id="item_group_donut_chart" style="min-width: 250px; min-height: 250px" data-kt-size="250"
// 										data-kt-line="18">
// 									</div>
// 								</div>
// 								<div class="d-flex1 flex-column1 content-justify-center w-100">
// 									<div id="item_group_legend"></div>
// 								</div>
// 							</div>
// 						</div>
// 					</div>

// 				</div>
// 			`;
// 		}
// 		$("#dashboard-content").html(content_html);
// 	}

// 	$(page.body).on("click", ".nav-link", function () {
// 		$(".nav-link").removeClass("active");
// 		$(this).addClass("active");
// 		let dashboard_type = $(this).data("dashboard");
// 		load_dashboard(dashboard_type);
// 	});

// 	// Load the default dashboard on page load
// 	load_dashboard("opportunity");
// };

// frappe.pages['sales-dashboard'].on_page_load = function (wrapper) {
//     var page = frappe.ui.make_app_page({
//         parent: wrapper,
//         title: 'Employee Dashboard',
//         single_column: true
//     });

//     let $content = $(
//         `<div>
//             <ul class="nav nav-tabs">
//                 <li class="nav-item">
//                     <a class="nav-link active" href="#" data-dashboard="opportunity">Opportunity Dashboard</a>
//                 </li>
//                 <li class="nav-item">
//                     <a class="nav-link" href="#" data-dashboard="target">Target Dashboard</a>
//                 </li>
//             </ul>
//             <div id="dashboard-content" class="mt-3">
//                 <p>Loading Opportunity Dashboard...</p>
//             </div>
//         </div>`
//     );

//     $(page.body).append($content);

//     function load_dashboard(type) {
//         let content_html = "";
//         if (type === "opportunity") {
//             content_html = `
//                 <h3>Opportunity Dashboard</h3><p>Details about opportunities...</p>
//                 <div class="row">
// 					<div class="col-12 col-md-12 col-lg-10">
// 						<div id="sales-overview" style="width: 100%;"></div>
// 					</div>
// 					<div class="col-12 col-md-12 col-lg-2">
// 						<div class="row">
// 							<div class="col-6 col-md-4 col-lg-12 mb-2">
// 								<div class="widget number-widget-box" data-widget-name="Opp Count(TM)">
// 									<div class="widget-head">
// 										<div class="widget-label">
// 											<div class="widget-title">
// 												<span class="ellipsis" title="Opp Count(TM)">
// 													<a href="#" target="_blank">
// 													Opp Count(TM)
// 													</a>
// 												</span>
// 											</div>
// 										</div>
// 										<div class="widget-control hidden">
// 											<div class="card-actions dropdown pull-right">
// 												<a data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
// 												...
// 												</a>
// 												<ul class="dropdown-menu" style="max-height: 300px; overflow-y: auto;">
// 													<li class="dropdown1-item">
// 														<a data-action="action-refresh">Refresh</a>
// 														</li><li class="dropdown1-item">
// 														<a data-action="action-edit">Edit</a>
// 													</li>
// 												</ul>
// 											</div>
// 										</div>
// 									</div>
// 									<div class="widget-body">
// 										<div class="widget-content">
// 											<div class="number ellipsis blue" id="opp-count_tm">0</div>
// 										</div>
// 									</div>
// 								</div>
// 							</div>	

// 							<div class="col-6 col-md-4 col-lg-12 mb-2">
// 								<div class="widget number-widget-box" data-widget-name="Closed Won(TM)">
// 									<div class="widget-head">
// 										<div class="widget-label">
// 											<div class="widget-title">
// 												<span class="ellipsis" title="Closed Won(TM)">
// 													<a href="/app/sales-funnel">
// 													Closed Won (TM)
// 													</a>
// 												</span>
// 											</div>
// 										</div>
// 										<div class="widget-control hidden">
// 											<div class="card-actions dropdown pull-right">
// 												<a data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
// 												...
// 												</a>
// 												<ul class="dropdown-menu" style="max-height: 300px; overflow-y: auto;">
// 													<li class="dropdown1-item">
// 														<a data-action="action-refresh">Refresh</a>
// 														</li><li class="dropdown1-item">
// 														<a data-action="action-edit">Edit</a>
// 													</li>
// 												</ul>
// 											</div>
// 										</div>
// 									</div>
// 									<div class="widget-body">
// 										<div class="widget-content">
// 											<div class="number green ellipsis" id="closed-amount_tm">₹0</div>
// 										</div>
// 									</div>
// 								</div>
// 							</div>	

// 							<div class="col-6 col-md-4 col-lg-12 mb-2">
// 								<div class="widget number-widget-box" data-widget-name="Closed Lost(TM)">
// 									<div class="widget-head">
// 										<div class="widget-label">
// 											<div class="widget-title">
// 												<span class="ellipsis" title="Closed Lost(TM)">
// 												<a href="/app/sales-funnel">
// 													Closed Lost(TM)
// 												</a>	
// 												</span>
// 											</div>
// 										</div>
// 										<div class="widget-control hidden">
// 											<div class="card-actions dropdown pull-right">
// 												<a data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
// 												...
// 												</a>
// 												<ul class="dropdown-menu" style="max-height: 300px; overflow-y: auto;">
// 													<li class="dropdown1-item">
// 														<a data-action="action-refresh">Refresh</a>
// 														</li><li class="dropdown1-item">
// 														<a data-action="action-edit">Edit</a>
// 													</li>
// 												</ul>
// 											</div>
// 										</div>
// 									</div>
// 									<div class="widget-body">
// 										<div class="widget-content">
// 											<div class="number ellipsis red" id="lost-amount_tm">₹ 0.00</div>
// 										</div>
// 									</div>
// 								</div>
// 							</div>
// 						</div>	
// 					</div>
// 				</div>	
//             `;
//         } else if (type === "target") {
//             content_html = `<h3>Target Dashboard</h3><p>Details about targets...</p>`;
//         }
//         $("#dashboard-content").html(content_html);
//     }

//     $(page.body).on("click", ".nav-link", function () {
//         $(".nav-link").removeClass("active");
//         $(this).addClass("active");
//         let dashboard_type = $(this).data("dashboard");
//         load_dashboard(dashboard_type);
//     });

//     // Load the default dashboard on page load
//     load_dashboard("opportunity");

//     function get_opp_count(sales_person = null) {
//         console.log("count sales person:", sales_person);
//         $("#opp-count").text(0);
//         frappe.call({
//             method: "custom_renewal.custom_renewal.page.sales_dashboard.sales_dashboard.get_total_numbers",
//             args: { sales_person: sales_person },
//             callback: function (r) {
//                 if (r.message) {
//                     let count = r.message || 0;
//                     $("#opp-count").text(count);
//                 }
//             }
//         });
//     }

//     function get_opp_amount(sales_person = null) {
//         $("#opp-amount").text(0);
//         frappe.call({
//             method: "custom_renewal.custom_renewal.page.sales_dashboard.sales_dashboard.get_total_price",
//             args: { sales_person: sales_person },
//             callback: function (r) {
//                 if (r.message) {
//                     let formatted_price = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(r.message);
//                     $("#opp-amount").text(formatted_price);
//                 }
//             }
//         });
//     }

//     function get_closed_amount(sales_person = null) {
//         $("#closed-amount").text(0);
//         frappe.call({
//             method: "custom_renewal.custom_renewal.page.sales_dashboard.sales_dashboard.get_total_price",
//             args: { sales_person: sales_person },
//             callback: function (r) {
//                 if (r.message) {
//                     let formatted_price = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(r.message);
//                     $("#closed-amount").text(formatted_price);
//                 }
//             }
//         });
//     }

//     function get_lost_amount(sales_person = null) {
//         $("#lost-amount").text(0);
//         frappe.call({
//             method: "custom_renewal.custom_renewal.page.sales_dashboard.sales_dashboard.get_total_price",
//             args: { sales_person: sales_person },
//             callback: function (r) {
//                 if (r.message) {
//                     let formatted_price = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(r.message);
//                     $("#lost-amount").text(formatted_price);
//                 }
//             }
//         });
//     }
// };



// frappe.pages['sales-dashboard'].on_page_load = function (wrapper) {
// 	let page = frappe.ui.make_app_page({
// 		parent: wrapper,
// 		title: "Custom Dashboard",
// 		single_column: true,
// 	});

// 	// Dropdown for selecting filter
// 	let filters = [
// 		{ label: "All", value: "all" },
// 		{ label: "Last Week", value: "last_week" },
// 		{ label: "This Month", value: "this_month" },
// 		{ label: "This Year", value: "this_year" },
// 	];

// 	let dropdown_html = `<select id="data_filter" class="form-control">
//         ${filters.map(filter => `<option value="${filter.value}">${filter.label}</option>`).join('')}
//     </select>`;

// 	let filter_section = $(`<div class="mb-3">${dropdown_html}</div>`);
// 	$(page.body).append(filter_section);

// 	// Container for Cards
// 	let card_container = $(`<div id="card_container" class="row"></div>`);
// 	$(page.body).append(card_container);

// 	// Fetch and Render Cards Initially
// 	fetch_and_render_cards("all");

// 	// Listen for Dropdown Change
// 	$("#data_filter").on("change", function () {
// 		let selected_value = $(this).val();
// 		fetch_and_render_cards(selected_value);
// 	});
// };

// // Function to Fetch and Render Cards
// function fetch_and_render_cards(filter) {
// 	frappe.call({
// 		method: "custom_renewal.custom_renewal.page.sales_dashboard.sales_dashboard.get_dashboard_data",
// 		args: { filter: filter },
// 		callback: function (r) {
// 			if (r.message) {
// 				let cards_html = r.message.map(data => `
//                     <div class="col-md-3">
//                         <div class="card p-3 shadow-sm">
//                             <h5>${data.title}</h5>
//                             <p>${data.value}</p>
//                         </div>
//                     </div>
//                 `).join("");

// 				$("#card_container").html(cards_html);
// 			}
// 		}
// 	});
// }



frappe.pages['sales-dashboard'].on_page_load = function (wrapper) {
	let page = frappe.ui.make_app_page({
		parent: wrapper,
		title: "Account Dashboard",
		single_column: true,
	});

	let content = `
        <div class="tab-pane fade show active" id="account-content">
            <p>Account Dashboard</p>
            <div class="row">
                <div class="col-12 col-md-4 col-lg-4 card">
                    <!-- Dropdown for Selecting Week -->
                    <div class="dropdown ms-2">
                        <button class="btn btn-light border-light btn-sm dropdown-toggle" type="button" id="weekDropdownButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Select week <i class="align-middle ms-1 wh-15" data-feather="chevron-down"></i>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li><a class="dropdown-item week-selector" href="#" data-target="lastweek-content" data-filter="last_week">Last Week</a></li>
                            <li><a class="dropdown-item week-selector" href="#" data-target="thismonth-content" data-filter="this_month">This Month</a></li>
                            <li><a class="dropdown-item week-selector" href="#" data-target="thisquarter-content" data-filter="this_quarter">This Quarter</a></li>
                            <li><a class="dropdown-item week-selector" href="#" data-target="thisyear-content" data-filter="this_year">This Year</a></li>
                        </ul>
                    </div>

                    <!-- Tab Content for Different Weeks Inside Account Tab -->
                    <div class="tab-content mt-3" id="account-week-content">
                        <div class="tab-pane fade show active" id="lastweek-content">
                            <p>Loading...</p>
                        </div>
                        <div class="tab-pane fade" id="thismonth-content">
                            <p>Loading...</p>
                        </div>
                        <div class="tab-pane fade" id="thisquarter-content">
                            <p>Loading...</p>
                        </div>
                        <div class="tab-pane fade" id="thisyear-content">
                            <p>Loading...</p>
                        </div>
                    </div>
                </div>
            </div>
			<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
        </div>`;

	$(page.body).html(content);

	// Load default data for "Last Week"
	fetch_and_render_data("lastweek-content", "last_week");

	// Add event listeners to week selectors
	$(".week-selector").on("click", function (event) {
		event.preventDefault();

		let targetContentId = $(this).attr("data-target");
		let filter = $(this).attr("data-filter");

		// Hide all tab content
		$("#account-week-content .tab-pane").removeClass("show active");

		// Show selected content
		$("#" + targetContentId).addClass("show active");

		// Update dropdown button text
		$("#weekDropdownButton").html($(this).text() + ' <i class="align-middle ms-1 wh-15" data-feather="chevron-down"></i>');

		// Fetch and update data dynamically
		fetch_and_render_data(targetContentId, filter);
	});
};

// Function to fetch and update data dynamically
function fetch_and_render_data(contentId, filter) {
	frappe.call({
		method: "custom_renewal.custom_renewal.page.sales_dashboard.sales_dashboard.get_weekly_data",
		args: { filter: filter },
		callback: function (r) {
			if (r.message) {
				$("#" + contentId).html(`<p>${r.message}</p>`);
			}
		}
	});
}




