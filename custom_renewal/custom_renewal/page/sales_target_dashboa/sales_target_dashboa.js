// frappe.pages['sales-target-dashboa'].on_page_load = function(wrapper) {
//   new SalesTargetDashboard(wrapper);
// };

// class SalesTargetDashboard {
//   constructor(wrapper) {
//     this.wrapper = wrapper;
//     this.page = frappe.ui.make_app_page({
//       parent: wrapper,
//       title: 'Target Allocation',
//       single_column: true
//     });
//     this.rowsData = [];
//     this.make();
//   }

//   make() {
//     this.rowCount = 0;
//     $(this.page.main).html(this.get_html());
//     this.load_dropdown_options();
//     this.bind_events();
//   }

//   get_html() {
//     return `
//       <div style="display: flex; justify-content: flex-end; margin-bottom: 15px;">
//         <button class="btn btn-primary" id="save_all_btn">Save</button>
//         <button class="btn btn-secondary ml-2" id="cancel_all_btn">Cancel</button>
//       </div>

//       <div class="target-allocation-section" style="padding: 20px; background-color: #fff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 30px;">
//         <h4>Target Allocation</h4>
//         <div class="form-row" style="display: flex; gap: 20px; flex-wrap: wrap;">
//           <div class="form-group" style="flex: 1; min-width: 180px;">
//             <label>Salesperson</label>
//             <select id="salesperson_select" class="form-control"></select>
//           </div>
//           <div class="form-group" style="flex: 1; min-width: 180px;">
//             <label>Financial Year</label>
//             <select id="fiscal_year_select" class="form-control"></select>
//           </div>
//           <div class="form-group" style="flex: 1; min-width: 180px;">
//             <label>Topline Target</label>
//             <input type="text" class="form-control" id="topline_input" />
//           </div>
//           <div class="form-group" style="flex: 1; min-width: 180px;">
//             <label>Bottomline Target</label>
//             <input type="text" class="form-control" id="bottomline_input" />
//           </div>
//         </div>
//       </div>

//       <div class="sub-targets-section">
//         <h4>Sub Targets Details</h4>
//         <table class="table table-bordered" id="sub_targets_table">
//           <thead>
//             <tr>
//               <th><input type="checkbox" id="select_all_rows"></th>
//               <th>No.</th>
//               <th>Category Type</th>
//               <th>Category</th>
//               <th>Fiscal Year</th>
//               <th>Target Distribution</th>
//               <th>Bottomline Target</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr><td colspan="8" class="text-center text-muted">No rows added.</td></tr>
//           </tbody>
//         </table>
//         <button class="btn btn-sm btn-outline-primary" id="add_row_btn">Add Row</button>
//         <button class="btn btn-sm btn-danger" id="delete_row_btn" style="display:none;">Delete Selected</button>
//       </div>

//       <div id="details_container" class="card" style="margin-top: 30px; padding: 20px; display: none; background: #f9f9f9; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
//         <h5>Sub Target Details</h5>
//         <div class="form-row" style="display: flex; gap: 15px; flex-wrap: wrap;">
//           <div class="form-group"><label>Category Type</label><input type="text" class="form-control" id="modal_category_type" /></div>
//           <div class="form-group"><label>Category</label><input type="text" class="form-control" id="modal_category" /></div>
//           <div class="form-group"><label>Fiscal Year</label><input type="text" class="form-control" id="modal_fiscal_year" /></div>
//           <div class="form-group"><label>Target Distribution</label><input type="text" class="form-control" id="modal_target_distribution" /></div>
//           <div class="form-group"><label>Bottomline Target</label><input type="text" class="form-control" id="modal_bottomline" /></div>
//           <div class="form-group"><label>Target Amount</label><input type="text" class="form-control" id="modal_target_amount" /></div>
//           <div class="form-group">
//             <label>Target DOM</label>
//             <select id="modal_target_dom" class="form-control">
//               <option value="Qty">Qty</option>
//               <option value="Amount">Amount</option>
//             </select>
//           </div>
//           <div class="form-group"><label>Topline Target</label><input type="text" class="form-control" id="modal_topline" /></div>
//           <div class="form-group">
//             <label>Status</label>
//             <select id="modal_status" class="form-control">
//               <option value="Open">Open</option>
//               <option value="Close">Close</option>
//             </select>
//           </div>
//         </div>
//         <div style="text-align: right; margin-top: 15px;">
//           <button class="btn btn-secondary" id="cancel_modal_btn">Cancel</button>
//         </div>
//       </div>
//     `;
//   }

//   bind_events() {
//     $('#add_row_btn').on('click', () => this.add_row());
//     $('#delete_row_btn').on('click', () => this.delete_selected_rows());
//     $('#cancel_modal_btn').on('click', () => $('#details_container').hide());
//     $('#save_all_btn').on('click', () => this.save_all_data());
//     $('#cancel_all_btn').on('click', () => location.reload());

//     $('#select_all_rows').on('change', function () {
//       $('input.row-selector').prop('checked', $(this).prop('checked'));
//       $('#delete_row_btn').toggle($('input.row-selector:checked').length > 0);
//     });
//   }

//   add_row() {
//     if ($('#sub_targets_table tbody tr').first().text().includes('No rows added')) {
//       $('#sub_targets_table tbody').empty();
//     }

//     this.rowsData.push({});  // placeholder for row data

//     const index = this.rowsData.length;
//     const row = `
//       <tr data-index="${index - 1}">
//         <td><input type="checkbox" class="row-selector"></td>
//         <td class="row-number">${index}</td>
//         <td><input type="text" class="form-control" /></td>
//         <td><input type="text" class="form-control" /></td>
//         <td><input type="text" class="form-control" /></td>
//         <td><input type="text" class="form-control" /></td>
//         <td><input type="text" class="form-control" /></td>
//         <td><button class="btn btn-info btn-sm view-details">Details</button></td>
//       </tr>
//     `;

//     $('#sub_targets_table tbody').append(row);

//     $('.view-details').off('click').on('click', (e) => {
//       const index = $(e.target).closest('tr').data('index');
//       this.show_details(index);
//     });

//     $('.row-selector').off('change').on('change', () => {
//       $('#delete_row_btn').toggle($('.row-selector:checked').length > 0);
//     });
//   }

//   delete_selected_rows() {
//     $('#sub_targets_table tbody tr').each((i, row) => {
//       if ($(row).find('.row-selector').is(':checked')) {
//         const index = $(row).data('index');
//         this.rowsData[index] = null;
//         $(row).remove();
//       }
//     });

//     // re-render row numbers
//     let num = 1;
//     $('#sub_targets_table tbody tr').each((i, row) => {
//       $(row).find('.row-number').text(num++);
//     });

//     $('#delete_row_btn').hide();
//   }

//   show_details(index) {
//     const data = this.rowsData[index] || {};

//     $('#modal_category_type').val(data.category_type || '');
//     $('#modal_category').val(data.category || '');
//     $('#modal_fiscal_year').val(data.fiscal_year || '');
//     $('#modal_target_distribution').val(data.target_distribution || '');
//     $('#modal_bottomline').val(data.bottomline || '');
//     $('#modal_target_amount').val(data.target_amount || '');
//     $('#modal_target_dom').val(data.target_dom || 'Qty');
//     $('#modal_topline').val(data.topline || '');
//     $('#modal_status').val(data.status || 'Open');

//     $('#details_container').show();

//     // Save changes into rowsData on blur
//     $('#details_container input, #details_container select').off('change').on('change', () => {
//       this.rowsData[index] = {
//         category_type: $('#modal_category_type').val(),
//         category: $('#modal_category').val(),
//         fiscal_year: $('#modal_fiscal_year').val(),
//         target_distribution: $('#modal_target_distribution').val(),
//         bottomline: $('#modal_bottomline').val(),
//         target_amount: $('#modal_target_amount').val(),
//         target_dom: $('#modal_target_dom').val(),
//         topline: $('#modal_topline').val(),
//         status: $('#modal_status').val()
//       };
//     });
//   }

//   save_all_data() {
//     const data = {
//       salesperson: $('#salesperson_select').val(),
//       fiscal_year: $('#fiscal_year_select').val(),
//       topline_target: $('#topline_input').val(),
//       bottomline_target: $('#bottomline_input').val(),
//       sub_targets: this.rowsData.filter(r => r)
//     };

//     frappe.call({
//       method: 'your_app.api.save_target_allocation',
//       args: { data },
//       callback: (r) => {
//         if (r.message === 'success') {
//           frappe.msgprint('Saved successfully');
//         } else {
//           frappe.throw('Error saving data');
//         }
//       }
//     });
//   }

//   load_dropdown_options() {
//     frappe.call({
//       method: 'your_app.api.get_target_filter_options',
//       callback: (r) => {
//         const opts = r.message || {};
//         this.populate_dropdown('salesperson_select', opts.salespersons);
//         this.populate_dropdown('fiscal_year_select', opts.fiscal_years);
//       }
//     });
//   }

//   populate_dropdown(id, options) {
//     const $select = $(`#${id}`);
//     $select.empty().append('<option value="">Select</option>');
//     options.forEach(opt => {
//       $select.append(`<option value="${opt}">${opt}</option>`);
//     });
//   }
// }




// frappe.pages['sales-target-dashboa'].on_page_load = function(wrapper) {
//   new SalesTargetDashboard(wrapper);
// };

// class SalesTargetDashboard {
//   constructor(wrapper) {
//     this.wrapper = wrapper;
//     this.page = frappe.ui.make_app_page({
//       parent: wrapper,
//       title: 'Target Allocation',
//       single_column: true
//     });
//     this.rowsData = [];
//     this.make();
//   }

//   make() {
//     this.rowCount = 0;
//     $(this.page.main).html(this.get_html());
//     this.load_dropdown_options();
//     this.bind_events();
//   }

//   get_html() {
//     return `
//       <div style="display: flex; justify-content: flex-end; margin-bottom: 15px;">
//         <button class="btn btn-primary" id="save_all_btn">Save</button>
//         <button class="btn btn-secondary ml-2" id="cancel_all_btn">Cancel</button>
//       </div>

//       <div class="target-allocation-section" style="padding: 20px; background-color: #fff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 30px;">
//         <h4>Target Allocation</h4>
//         <div class="form-row" style="display: flex; gap: 20px; flex-wrap: wrap;">
//           <div class="form-group" style="flex: 1; min-width: 180px;">
//             <label>Salesperson</label>
//             <select id="salesperson_select" class="form-control"></select>
//           </div>
//           <div class="form-group" style="flex: 1; min-width: 180px;">
//             <label>Financial Year</label>
//             <select id="fiscal_year_select" class="form-control"></select>
//           </div>
//           <div class="form-group" style="flex: 1; min-width: 180px;">
//             <label>Topline Target</label>
//             <input type="text" class="form-control" id="topline_input" />
//           </div>
//           <div class="form-group" style="flex: 1; min-width: 180px;">
//             <label>Bottomline Target</label>
//             <input type="text" class="form-control" id="bottomline_input" />
//           </div>
//         </div>
//       </div>

//       <div class="sub-targets-section">
//         <h4>Sub Targets Details</h4>
//         <table class="table table-bordered" id="sub_targets_table">
//           <thead>
//             <tr>
//               <th><input type="checkbox" id="select_all_rows"></th>
//               <th>No.</th>
//               <th>Category Type</th>
//               <th>Category</th>
//               <th>Fiscal Year</th>
//               <th>Target Distribution</th>
//               <th>Bottomline Target</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr><td colspan="8" class="text-center text-muted">No rows added.</td></tr>
//           </tbody>
//         </table>
//         <button class="btn btn-sm btn-outline-primary" id="add_row_btn">Add Row</button>
//         <button class="btn btn-sm btn-danger" id="delete_row_btn" style="display:none;">Delete Selected</button>
//       </div>

//       <div id="details_container" class="card" style="margin-top: 30px; padding: 20px; display: none; background: #f9f9f9; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
//         <h5>Sub Target Details</h5>
//         <div class="form-row" style="display: flex; gap: 15px; flex-wrap: wrap;">
//           <div class="form-group"><label>Category Type</label><input type="text" class="form-control" id="modal_category_type" /></div>
//           <div class="form-group"><label>Category</label><input type="text" class="form-control" id="modal_category" /></div>
//           <div class="form-group"><label>Fiscal Year</label><input type="text" class="form-control" id="modal_fiscal_year" /></div>
//           <div class="form-group"><label>Target Distribution</label><input type="text" class="form-control" id="modal_target_distribution" /></div>
//           <div class="form-group"><label>Bottomline Target</label><input type="text" class="form-control" id="modal_bottomline" /></div>
//           <div class="form-group"><label>Target Amount</label><input type="text" class="form-control" id="modal_target_amount" /></div>
//           <div class="form-group">
//             <label>Target DOM</label>
//             <select id="modal_target_dom" class="form-control">
//               <option value="Qty">Qty</option>
//               <option value="Amount">Amount</option>
//             </select>
//           </div>
//           <div class="form-group"><label>Topline Target</label><input type="text" class="form-control" id="modal_topline" /></div>
//           <div class="form-group">
//             <label>Status</label>
//             <select id="modal_status" class="form-control">
//               <option value="Open">Open</option>
//               <option value="Close">Close</option>
//             </select>
//           </div>
//         </div>
//         <div style="text-align: right; margin-top: 15px;">
//           <button class="btn btn-secondary" id="cancel_modal_btn">Back</button>
//         </div>
//       </div>
//     `;
//   }

//   bind_events() {
//     $('#add_row_btn').on('click', () => this.handle_add_row());
//     $('#delete_row_btn').on('click', () => this.delete_selected_rows());
//     $('#cancel_modal_btn').on('click', () => this.render_table());
//     $('#save_all_btn').on('click', () => this.save_all_data());
//     $('#cancel_all_btn').on('click', () => location.reload());

//     $('#select_all_rows').on('change', function () {
//       $('input.row-selector').prop('checked', $(this).prop('checked'));
//       $('#delete_row_btn').toggle($('input.row-selector:checked').length > 0);
//     });
//   }

//   handle_add_row() {
//     const index = this.rowsData.length;
//     this.rowsData.push({});
//     this.render_table();
//     this.show_details(index);
//   }

//   render_table() {
//     const tbody = $('#sub_targets_table tbody');
//     tbody.empty();

//     if (this.rowsData.filter(r => r).length === 0) {
//       tbody.html('<tr><td colspan="8" class="text-center text-muted">No rows added.</td></tr>');
//       return;
//     }

//     this.rowsData.forEach((row, i) => {
//       if (!row) return;
//       const tr = $(`
//         <tr data-index="${i}">
//           <td><input type="checkbox" class="row-selector"></td>
//           <td class="row-number">${i + 1}</td>
//           <td class="cell-category-type"><input type="text" class="form-control" value="${row.category_type || ''}" disabled /></td>
//           <td class="cell-category"><input type="text" class="form-control" value="${row.category || ''}" disabled /></td>
//           <td class="cell-fiscal-year"><input type="text" class="form-control" value="${row.fiscal_year || ''}" disabled /></td>
//           <td class="cell-distribution"><input type="text" class="form-control" value="${row.target_distribution || ''}" disabled /></td>
//           <td class="cell-bottomline"><input type="text" class="form-control" value="${row.bottomline || ''}" disabled /></td>
//           <td><button class="btn btn-info btn-sm view-details">Details</button></td>
//         </tr>
//       `);
//       tbody.append(tr);
//     });

//     this.bind_row_events();
//     $('#details_container').hide();
//   }

//   bind_row_events() {
//     $('.view-details').off('click').on('click', (e) => {
//       const index = $(e.target).closest('tr').data('index');
//       this.show_details(index);
//     });

//     $('.row-selector').off('change').on('change', () => {
//       $('#delete_row_btn').toggle($('.row-selector:checked').length > 0);
//     });
//   }

//   delete_selected_rows() {
//     $('#sub_targets_table tbody tr').each((i, row) => {
//       if ($(row).find('.row-selector').is(':checked')) {
//         const index = $(row).data('index');
//         this.rowsData[index] = null;
//         $(row).remove();
//       }
//     });
//     this.render_table();
//     $('#delete_row_btn').hide();
//   }

//   show_details(index) {
//     const data = this.rowsData[index] || {};

//     $('#modal_category_type').val(data.category_type || '');
//     $('#modal_category').val(data.category || '');
//     $('#modal_fiscal_year').val(data.fiscal_year || '');
//     $('#modal_target_distribution').val(data.target_distribution || '');
//     $('#modal_bottomline').val(data.bottomline || '');
//     $('#modal_target_amount').val(data.target_amount || '');
//     $('#modal_target_dom').val(data.target_dom || 'Qty');
//     $('#modal_topline').val(data.topline || '');
//     $('#modal_status').val(data.status || 'Open');

//     $('#details_container').show();

//     $('#details_container input, #details_container select').off('change').on('change', () => {
//       const updated = {
//         category_type: $('#modal_category_type').val(),
//         category: $('#modal_category').val(),
//         fiscal_year: $('#modal_fiscal_year').val(),
//         target_distribution: $('#modal_target_distribution').val(),
//         bottomline: $('#modal_bottomline').val(),
//         target_amount: $('#modal_target_amount').val(),
//         target_dom: $('#modal_target_dom').val(),
//         topline: $('#modal_topline').val(),
//         status: $('#modal_status').val()
//       };
//       this.rowsData[index] = updated;

//       const $row = $(`#sub_targets_table tbody tr[data-index="${index}"]`);
//       $row.find('.cell-category-type input').val(updated.category_type);
//       $row.find('.cell-category input').val(updated.category);
//       $row.find('.cell-fiscal-year input').val(updated.fiscal_year);
//       $row.find('.cell-distribution input').val(updated.target_distribution);
//       $row.find('.cell-bottomline input').val(updated.bottomline);
//     });
//   }

//   save_all_data() {
//     const data = {
//       salesperson: $('#salesperson_select').val(),
//       fiscal_year: $('#fiscal_year_select').val(),
//       topline_target: $('#topline_input').val(),
//       bottomline_target: $('#bottomline_input').val(),
//       sub_targets: this.rowsData.filter(r => r)
//     };

//     frappe.call({
//       method: 'your_app.api.save_target_allocation',
//       args: { data },
//       callback: (r) => {
//         if (r.message === 'success') {
//           frappe.msgprint('Saved successfully');
//         } else {
//           frappe.throw('Error saving data');
//         }
//       }
//     });
//   }

//   load_dropdown_options() {
//     frappe.call({
//       method: 'your_app.api.get_target_filter_options',
//       callback: (r) => {
//         const opts = r.message || {};
//         this.populate_dropdown('salesperson_select', opts.salespersons);
//         this.populate_dropdown('fiscal_year_select', opts.fiscal_years);
//       }
//     });
//   }

//   populate_dropdown(id, options) {
//     const $select = $(`#${id}`);
//     $select.empty().append('<option value="">Select</option>');
//     options.forEach(opt => {
//       $select.append(`<option value="${opt}">${opt}</option>`);
//     });
//   }
// }


// frappe.pages['sales-target-dashboa'].on_page_load = function(wrapper) {
//   new SalesTargetDashboard(wrapper);
// };

// class SalesTargetDashboard {
//   constructor(wrapper) {
//     this.wrapper = wrapper;
//     this.page = frappe.ui.make_app_page({
//       parent: wrapper,
//       title: 'Target Allocation',
//       single_column: true
//     });
//     this.rowsData = [];
//     this.make();
//   }

//   make() {
//     this.rowCount = 0;
//     $(this.page.main).html(this.get_html());
//     this.load_dropdown_options();
//     this.bind_events();
//   }

//   get_html() {
//     return `
//       <div style="display: flex; justify-content: flex-end; margin-bottom: 15px;">
//         <button class="btn btn-primary" id="save_all_btn">Save</button>
//         <button class="btn btn-secondary ml-2" id="cancel_all_btn">Cancel</button>
//       </div>

//       <div class="target-allocation-section" style="padding: 20px; background-color: #fff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 30px;">
//         <h4>Target Allocation</h4>
//         <div class="form-row" style="display: flex; gap: 20px; flex-wrap: wrap;">
//           <div class="form-group" style="flex: 1; min-width: 180px;">
//             <label>Salesperson</label>
//             <select id="salesperson_select" class="form-control"></select>
//           </div>
//           <div class="form-group" style="flex: 1; min-width: 180px;">
//             <label>Financial Year</label>
//             <select id="fiscal_year_select" class="form-control"></select>
//           </div>
//           <div class="form-group" style="flex: 1; min-width: 180px;">
//             <label>Topline Target</label>
//             <input type="text" class="form-control" id="topline_input" />
//           </div>
//           <div class="form-group" style="flex: 1; min-width: 180px;">
//             <label>Bottomline Target</label>
//             <input type="text" class="form-control" id="bottomline_input" />
//           </div>
//         </div>
//       </div>

//       <div class="sub-targets-section">
//         <h4>Sub Targets Details</h4>
//         <table class="table table-bordered" id="sub_targets_table">
//           <thead>
//             <tr>
//               <th><input type="checkbox" id="select_all_rows"></th>
//               <th>No.</th>
//               <th>Category Type</th>
//               <th>Category</th>
//               <th>Fiscal Year</th>
//               <th>Target Distribution</th>
//               <th>Bottomline Target</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr><td colspan="8" class="text-center text-muted">No rows added.</td></tr>
//           </tbody>
//         </table>
//         <button class="btn btn-sm btn-outline-primary" id="add_row_btn">Add Row</button>
//         <button class="btn btn-sm btn-danger" id="delete_row_btn" style="display:none;">Delete Selected</button>
//       </div>

//       <div id="details_container" class="card" style="margin-top: 30px; padding: 20px; display: none; background: #f9f9f9; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
//         <h5>Sub Target Details</h5>
//         <div class="form-row" style="display: flex; gap: 15px; flex-wrap: wrap;">
//           <div class="form-group"><label>Category Type</label><input type="text" class="form-control" id="modal_category_type" /></div>
//           <div class="form-group"><label>Category</label><input type="text" class="form-control" id="modal_category" /></div>
//           <div class="form-group"><label>Fiscal Year</label><input type="text" class="form-control" id="modal_fiscal_year" /></div>
//           <div class="form-group"><label>Target Distribution</label><input type="text" class="form-control" id="modal_target_distribution" /></div>
//           <div class="form-group"><label>Bottomline Target</label><input type="text" class="form-control" id="modal_bottomline" /></div>
//           <div class="form-group"><label>Target Amount</label><input type="text" class="form-control" id="modal_target_amount" /></div>
//           <div class="form-group">
//             <label>Target DOM</label>
//             <select id="modal_target_dom" class="form-control">
//               <option value="Qty">Qty</option>
//               <option value="Amount">Amount</option>
//             </select>
//           </div>
//           <div class="form-group"><label>Topline Target</label><input type="text" class="form-control" id="modal_topline" /></div>
//           <div class="form-group">
//             <label>Status</label>
//             <select id="modal_status" class="form-control">
//               <option value="Open">Open</option>
//               <option value="Close">Close</option>
//             </select>
//           </div>
//         </div>
//         <div style="text-align: right; margin-top: 15px;">
//           <button class="btn btn-secondary" id="cancel_modal_btn">Back</button>
//         </div>
//       </div>
//     `;
//   }

//   bind_events() {
//     $('#add_row_btn').on('click', () => this.add_row());
//     $('#delete_row_btn').on('click', () => this.delete_selected_rows());
//     $('#cancel_modal_btn').on('click', () => $('#details_container').hide());
//     $('#save_all_btn').on('click', () => this.save_all_data());
//     $('#cancel_all_btn').on('click', () => location.reload());

//     $('#select_all_rows').on('change', function () {
//       $('input.row-selector').prop('checked', $(this).prop('checked'));
//       $('#delete_row_btn').toggle($('input.row-selector:checked').length > 0);
//     });
//   }

//   add_row() {
//     if ($('#sub_targets_table tbody tr').first().text().includes('No rows added')) {
//       $('#sub_targets_table tbody').empty();
//     }

//     const index = this.rowsData.length;
//     this.rowsData.push({
//       category_type: '',
//       category: '',
//       fiscal_year: '',
//       target_distribution: '',
//       bottomline: '',
//       target_amount: '',
//       target_dom: 'Qty',
//       topline: '',
//       status: 'Open'
//     });

//     const row = `
//       <tr data-index="${index}">
//         <td><input type="checkbox" class="row-selector"></td>
//         <td class="row-number">${index + 1}</td>
//         <td><input type="text" class="form-control category_type_input" /></td>
//         <td><input type="text" class="form-control category_input" /></td>
//         <td><input type="text" class="form-control fiscal_year_input" /></td>
//         <td><input type="text" class="form-control target_distribution_input" /></td>
//         <td><input type="text" class="form-control bottomline_input" /></td>
//         <td><button class="btn btn-info btn-sm view-details">Details</button></td>
//       </tr>
//     `;

//     $('#sub_targets_table tbody').append(row);

//     $('.view-details').off('click').on('click', (e) => {
//       const index = $(e.target).closest('tr').data('index');
//       this.show_details(index);
//     });

//     $('.row-selector').off('change').on('change', () => {
//       $('#delete_row_btn').toggle($('.row-selector:checked').length > 0);
//     });
//   }

//   show_details(index) {
//     const $row = $(`tr[data-index="${index}"]`);

//     const rowData = {
//       category_type: $row.find('.category_type_input').val(),
//       category: $row.find('.category_input').val(),
//       fiscal_year: $row.find('.fiscal_year_input').val(),
//       target_distribution: $row.find('.target_distribution_input').val(),
//       bottomline: $row.find('.bottomline_input').val(),
//       target_amount: this.rowsData[index]?.target_amount || '',
//       target_dom: this.rowsData[index]?.target_dom || 'Qty',
//       topline: this.rowsData[index]?.topline || '',
//       status: this.rowsData[index]?.status || 'Open'
//     };

//     $('#modal_category_type').val(rowData.category_type);
//     $('#modal_category').val(rowData.category);
//     $('#modal_fiscal_year').val(rowData.fiscal_year);
//     $('#modal_target_distribution').val(rowData.target_distribution);
//     $('#modal_bottomline').val(rowData.bottomline);
//     $('#modal_target_amount').val(rowData.target_amount);
//     $('#modal_target_dom').val(rowData.target_dom);
//     $('#modal_topline').val(rowData.topline);
//     $('#modal_status').val(rowData.status);

//     $('#details_container').show();

//     $('#details_container input, #details_container select').off('change').on('change', () => {
//       const updatedData = {
//         category_type: $('#modal_category_type').val(),
//         category: $('#modal_category').val(),
//         fiscal_year: $('#modal_fiscal_year').val(),
//         target_distribution: $('#modal_target_distribution').val(),
//         bottomline: $('#modal_bottomline').val(),
//         target_amount: $('#modal_target_amount').val(),
//         target_dom: $('#modal_target_dom').val(),
//         topline: $('#modal_topline').val(),
//         status: $('#modal_status').val()
//       };

//       this.rowsData[index] = updatedData;

//       $row.find('.category_type_input').val(updatedData.category_type);
//       $row.find('.category_input').val(updatedData.category);
//       $row.find('.fiscal_year_input').val(updatedData.fiscal_year);
//       $row.find('.target_distribution_input').val(updatedData.target_distribution);
//       $row.find('.bottomline_input').val(updatedData.bottomline);
//     });
//   }

//   delete_selected_rows() {
//     $('#sub_targets_table tbody tr').each((i, row) => {
//       if ($(row).find('.row-selector').is(':checked')) {
//         const index = $(row).data('index');
//         this.rowsData[index] = null;
//         $(row).remove();
//       }
//     });

//     let num = 1;
//     $('#sub_targets_table tbody tr').each((i, row) => {
//       $(row).find('.row-number').text(num++);
//     });

//     $('#delete_row_btn').hide();
//   }

//   save_all_data() {
//     const data = {
//       salesperson: $('#salesperson_select').val(),
//       fiscal_year: $('#fiscal_year_select').val(),
//       topline_target: $('#topline_input').val(),
//       bottomline_target: $('#bottomline_input').val(),
//       sub_targets: this.rowsData.filter(r => r)
//     };

//     frappe.call({
//       method: 'your_app.api.save_target_allocation',
//       args: { data },
//       callback: (r) => {
//         if (r.message === 'success') {
//           frappe.msgprint('Saved successfully');
//         } else {
//           frappe.throw('Error saving data');
//         }
//       }
//     });
//   }

//   load_dropdown_options() {
//     frappe.call({
//       method: 'your_app.api.get_target_filter_options',
//       callback: (r) => {
//         const opts = r.message || {};
//         this.populate_dropdown('salesperson_select', opts.salespersons);
//         this.populate_dropdown('fiscal_year_select', opts.fiscal_years);
//       }
//     });
//   }

//   populate_dropdown(id, options) {
//     const $select = $(`#${id}`);
//     $select.empty().append('<option value="">Select</option>');
//     options.forEach(opt => {
//       $select.append(`<option value="${opt}">${opt}</option>`);
//     });
//   }
// }

frappe.pages['sales-target-dashboa'].on_page_load = function(wrapper) {
  new SalesTargetDashboard(wrapper);
};
class SalesTargetDashboard {
  constructor(wrapper) {
    this.wrapper = wrapper;
    // this.page = frappe.ui.make_app_page({
    //   parent: wrapper,
    //   title: 'Target Allocation',
    //   single_column: true
    // });
    this.page = frappe.ui.make_app_page({
  parent: wrapper,
  title: 'Target Allocation',
  single_column: true
});
// Set Save as primary action (right side of title)
this.page.set_primary_action('Save', () => this.save_all_data(), 'save');

// Add Cancel button next to it
this.page.add_inner_button('Cancel', () => location.reload());

    this.rowsData = [];
    this.make();
  }
  make() {
    this.rowCount = 0;
    $(this.page.main).html(this.get_html());
    this.load_dropdown_options();
    this.bind_events();
  }
  get_html() {
    return `

      <style>
      
  input[type="text"],select.form-control {
    border: 1px solid #333 !important; /* Thick dark border */
    border-radius: 6px;
    padding: 6px 6px;
    font-size: 14px;
    background-color: #fff;
    box-shadow: none;
    outline: none;
  }
</style>
      <div class="target-allocation-section" style="padding: 2px; background-color: #fff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 5px;">

        <div class="form-row" style="display: flex; gap: 20px; flex-wrap: wrap;A">
          <div class="form-group" style="flex: 1; min-width: 180px;">
            <label>Salesperson</label>
            <select id="salesperson_select" class="form-control">
            <option value="">select</option>
            </select>
          </div>
          <div class="form-group" style="flex: 1; min-width: 180px;">
            <label>Financial Year</label>
            <select id="fiscal_year_select" class="form-control">
            <option value="">select</option></select>
          </div>
          <div class="form-group" style="flex: 1; min-width: 180px;">
            <label>Topline Target</label>
            <input type="text" class="form-control" id="topline_input" />
          </div>
          <div class="form-group" style="flex: 1; min-width: 180px;">
            <label>Bottomline Target</label>
            <input type="text" class="form-control" id="bottomline_input" />
          </div>
        </div>
      </div>
      <div class="sub-targets-section">
        <h4>Sub Targets Details</h4>
        <table class="table table-bordered" id="sub_targets_table">
          <thead>
            <tr>
              <th><input type="checkbox" id="select_all_rows"></th>
              <th>No.</th>
              <th>Category Type</th>
              <th>Category</th>
              <th>Fiscal Year</th>
              <th>Target Distribution</th>
              <th>Bottomline Target</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr><td colspan="8" class="text-center text-muted">No rows added.</td></tr>
          </tbody>
        </table>
        <button class="btn btn-sm btn-outline-primary" id="add_row_btn">Add Row</button>
        <button class="btn btn-sm btn-danger" id="delete_row_btn" style="display:none;">Delete Selected</button>
      </div>
      <div id="details_container" class="card" style="margin-top: 30px; padding: 20px; display: none; background: #f9f9f9; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
        <h5>Sub Target Details</h5>
        <div class="form-row" style="display: flex; gap: 15px; flex-wrap: wrap;">
          <div class="form-group"><label>Category Type</label><input type="text" class="form-control" id="modal_category_type" /></div>
          <div class="form-group"><label>Category</label><input type="text" class="form-control" id="modal_category" /></div>
          <div class="form-group"><label>Fiscal Year</label><input type="text" class="form-control" id="modal_fiscal_year" /></div>
          <div class="form-group"><label>Target Distribution</label><input type="text" class="form-control" id="modal_target_distribution" /></div>
          <div class="form-group"><label>Bottomline Target</label><input type="text" class="form-control" id="modal_bottomline" /></div>
          <div class="form-group"><label>Target Amount</label><input type="text" class="form-control" id="modal_target_amount" /></div>
          <div class="form-group">
            <label>Target DOM</label>
            <select id="modal_target_dom" class="form-control">
              <option value="Qty">Qty</option>
              <option value="Amount">Amount</option>
            </select>
          </div>
          <div class="form-group"><label>Topline Target</label><input type="text" class="form-control" id="modal_topline" /></div>
          <div class="form-group">
            <label>Status</label>
            <select id="modal_status" class="form-control">
              <option value="Open">Open</option>
              <option value="Close">Close</option>
            </select>
          </div>
        </div>
        <div style="text-align: right; margin-top: 15px;">
          <button class="btn btn-secondary" id="cancel_modal_btn">Back</button>
        </div>
      </div>
    `;
  }
  bind_events() {
    $('#add_row_btn').on('click', () => this.add_row());
    $('#delete_row_btn').on('click', () => this.delete_selected_rows());
    $('#cancel_modal_btn').on('click', () => $('#details_container').hide());
    
    $('#select_all_rows').on('change', function () {
      $('input.row-selector').prop('checked', $(this).prop('checked'));
      $('#delete_row_btn').toggle($('input.row-selector:checked').length > 0);
    });
  }
  add_row() {
    $('#details_container').hide(); 
    $('#details_container input').val('');
    $('#details_container select').val('Open');
    if ($('#sub_targets_table tbody tr').first().text().includes('No rows added')) {
      $('#sub_targets_table tbody').empty();
    }
    const index = this.rowsData.length;
    this.rowsData.push({
      category_type: '',
      category: '',
      fiscal_year: '',
      target_distribution: '',
      bottomline: '',
      target_amount: '',
      target_dom: 'Qty',
      topline: '',
      status: 'Open'
    });

    const row = `
      <tr data-index="${index}">
        <td><input type="checkbox" class="row-selector"></td>
        <td class="row-number">${index + 1}</td>
        <td><input type="text" class="form-control category_type_input" /></td>
        <td><input type="text" class="form-control category_input" /></td>
        <td><input type="text" class="form-control fiscal_year_input" /></td>
        <td><input type="text" class="form-control target_distribution_input" /></td>
        <td><input type="text" class="form-control bottomline_input" /></td>
        <td><button class="btn btn-info btn-sm view-details">Details</button></td>
      </tr>
    `;

    $('#sub_targets_table tbody').append(row);

    $('.view-details').off('click').on('click', (e) => {
      const index = $(e.target).closest('tr').data('index');
      this.show_details(index);
    });

    $('.row-selector').off('change').on('change', () => {
      $('#delete_row_btn').toggle($('.row-selector:checked').length > 0);
    });
  }

  show_details(index) {
    const $row = $(`tr[data-index="${index}"]`);

    const rowData = {
      category_type: $row.find('.category_type_input').val(),
      category: $row.find('.category_input').val(),
      fiscal_year: $row.find('.fiscal_year_input').val(),
      target_distribution: $row.find('.target_distribution_input').val(),
      bottomline: $row.find('.bottomline_input').val(),
      target_amount: this.rowsData[index]?.target_amount || '',
      target_dom: this.rowsData[index]?.target_dom || 'Qty',
      topline: this.rowsData[index]?.topline || '',
      status: this.rowsData[index]?.status || 'Open'
    };

    $('#modal_category_type').val(rowData.category_type);
    $('#modal_category').val(rowData.category);
    $('#modal_fiscal_year').val(rowData.fiscal_year);
    $('#modal_target_distribution').val(rowData.target_distribution);
    $('#modal_bottomline').val(rowData.bottomline);
    $('#modal_target_amount').val(rowData.target_amount);
    $('#modal_target_dom').val(rowData.target_dom);
    $('#modal_topline').val(rowData.topline);
    $('#modal_status').val(rowData.status);

    $('#details_container').show();

    $('#details_container input, #details_container select').off('change').on('change', () => {
      const updatedData = {
        category_type: $('#modal_category_type').val(),
        category: $('#modal_category').val(),
        fiscal_year: $('#modal_fiscal_year').val(),
        target_distribution: $('#modal_target_distribution').val(),
        bottomline: $('#modal_bottomline').val(),
        target_amount: $('#modal_target_amount').val(),
        target_dom: $('#modal_target_dom').val(),
        topline: $('#modal_topline').val(),
        status: $('#modal_status').val()
      };

      this.rowsData[index] = updatedData;

      $row.find('.category_type_input').val(updatedData.category_type);
      $row.find('.category_input').val(updatedData.category);
      $row.find('.fiscal_year_input').val(updatedData.fiscal_year);
      $row.find('.target_distribution_input').val(updatedData.target_distribution);
      $row.find('.bottomline_input').val(updatedData.bottomline);
    });
  }

  delete_selected_rows() {
  const newRowsData = [];

  $('#sub_targets_table tbody tr').each((i, row) => {
    const $row = $(row);
    const isChecked = $row.find('.row-selector').is(':checked');
    if (!isChecked) {
      
      const category_type = $row.find('.category_type_input').val();
      const category = $row.find('.category_input').val();
      const fiscal_year = $row.find('.fiscal_year_input').val();
      const target_distribution = $row.find('.target_distribution_input').val();
      const bottomline = $row.find('.bottomline_input').val();
      const oldIndex = $row.data('index');
      const oldData = this.rowsData[oldIndex] || {};
      newRowsData.push({
        category_type,
        category,
        fiscal_year,
        target_distribution,
        bottomline,
        target_amount: oldData.target_amount || '',
        target_dom: oldData.target_dom || 'Qty',
        topline: oldData.topline || '',
        status: oldData.status || 'Open'
      });
    }
  });

  this.rowsData = newRowsData;
  const $tbody = $('#sub_targets_table tbody');
  $tbody.empty();

  if (this.rowsData.length === 0) {
    $tbody.append(`<tr><td colspan="8" class="text-center text-muted">No rows added.</td></tr>`);
  } else {
    this.rowsData.forEach((rowData, index) => {
      const row = `
        <tr data-index="${index}">
          <td><input type="checkbox" class="row-selector"></td>
          <td class="row-number">${index + 1}</td>
          <td><input type="text" class="form-control category_type_input" value="${rowData.category_type}" /></td>
          <td><input type="text" class="form-control category_input" value="${rowData.category}" /></td>
          <td><input type="text" class="form-control fiscal_year_input" value="${rowData.fiscal_year}" /></td>
          <td><input type="text" class="form-control target_distribution_input" value="${rowData.target_distribution}" /></td>
          <td><input type="text" class="form-control bottomline_input" value="${rowData.bottomline}" /></td>
          <td><button class="btn btn-info btn-sm view-details">Details</button></td>
        </tr>
      `;
      $tbody.append(row);
    });
    $('.view-details').off('click').on('click', (e) => {
      const index = $(e.target).closest('tr').data('index');
      this.show_details(index);
    });

    $('.row-selector').off('change').on('change', () => {
      $('#delete_row_btn').toggle($('.row-selector:checked').length > 0);
    });
  }

  $('#delete_row_btn').hide();
  $('#details_container').hide(); 
}
  save_all_data() {
    const data = {
      salesperson: $('#salesperson_select').val(),
      fiscal_year: $('#fiscal_year_select').val(),
      topline_target: $('#topline_input').val(),
      bottomline_target: $('#bottomline_input').val(),
      sub_targets: this.rowsData.filter(r => r)
    };

    frappe.call({
      method: 'your_app.api.save_target_allocation',
      args: { data },
      callback: (r) => {
        if (r.message === 'success') {
          frappe.msgprint('Saved successfully');
        } else {
          frappe.throw('Error saving data');
        }
      }
    });
  }
  load_dropdown_options() {
    frappe.call({
      method: 'your_app.api.get_target_filter_options',
      callback: (r) => {
        const opts = r.message || {};
        this.populate_dropdown('salesperson_select', opts.salespersons);
        this.populate_dropdown('fiscal_year_select', opts.fiscal_years);
        this.populate_dropdown('modal_fiscal_year', opts.fiscal_years);

      }
    });
  }
  populate_dropdown(id, options) {
    const $select = $(`#${id}`);
    $select.empty().append('<option value="">Select</option>');
    options.forEach(opt => {
      $select.append(`<option value="${opt}">${opt}</option>`);
    });
  }
}


