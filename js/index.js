
$(document).ready(function () {
//    jQuery("#rowed2").jqGrid({
//        url: 'data.php',
//        datatype: "json",
//        colNames: ['EMPLOYEE ID', 'LAST NAME',''],
//        colModel: [
//            {name: 'id', index: 'id', width: 70},
//            {name: 'name', index: 'LastName', width: 90, classes: 'cvteste', editable: true},       
//            {name: 'act', index: 'act', width: 270, sortable: false}
//        ],
//        rowNum: 10,
//        rowList: [10, 20, 30],
//        pager: '#prowed2',
//        sortname: 'id',
//        viewrecords: true,
//        loadonce: true,
//        sortable: true,
//        height: '100%',
//        sortable: true,
//        sortorder: "desc",
//        gridComplete: function () {
//            var ids = jQuery("#rowed2").jqGrid('getDataIDs');
//            for (var i = 0; i < ids.length; i++) {
//                var cl = ids[i];
//                be = "<input style='height:22px;width:40px;' type='button' value='Edit' onclick=\"jQuery('#rowed2').jqGrid('editRow','" + cl + "');\"  />";
//                se = "<input style='height:22px;width:40px;' type='button' value='Save' onclick=\"jQuery('#rowed2').jqGrid('saveRow','" + cl + "');\"  />";
//                ce = "<input style='height:22px;width:50px;' type='button' value='Cancel' onclick=\"jQuery('#rowed2').jqGrid('restoreRow','" + cl + "');\" />";
//                jQuery("#rowed2").jqGrid('setRowData', ids[i], {act: be + se + ce});
//            }
//        },
//        editurl: "update.php"
//    });
//    jQuery("#rowed2").jqGrid('navGrid', "#prowed2", {edit: false, add: false, del: false});


    $("#rowed2").jqGrid({
        url: "data.php",
        datatype: "json",
        height: "auto",
        method: "POST",
        colNames: ["", "Id", "Name","Name1", ""],
        colModel: [
            {name: "link", width: 120},
            {name: "id", width: 120},
            {name: "name", width: 300, editable: true,editrules: { custom: true, custom_func: checkvalidname }},
            {name: "add", width: 300, editable: true,editrules: { custom: true, custom_func: checkvalidname }},
            {name: 'act', index: 'act', width: 270, sortable: false}
        ],
        jsonReader: {
            repeatitems: false,
            id: "ID"
        },
        caption: "Detail",
        rowNum: 15,
        pager: '#prowed2',
        loadonce: true,//chay sort
        sortable: true,
        sortname: "id",
        sortorder: "desc",
        viewrecords: true,
        cellEdit : true,
	cellsubmit : 'clientArray',
        gridComplete: function () {
            var ids = jQuery("#rowed2").jqGrid('getDataIDs');
          
            for (var i = 0; i < ids.length; i++) {
                var cl = ids[i];
                be = "<input style='height:22px;width:40px;' type='button' value='Edit' onclick=\"jQuery('#rowed2').jqGrid('editRow','" + cl + "');\"  />";
                se = "<input style='height:22px;width:40px;' type='button' value='Save' onclick=\"jQuery('#rowed2').jqGrid('saveRow','" + cl + "');\"  />";
                ce = "<input style='height:22px;width:50px;' type='button' value='Cancel' onclick=\"jQuery('#rowed2').jqGrid('restoreRow','" + cl + "');\" />";
                link = "<a href='http://localhost/taiyo/index.php?id=" + cl + "'>ClickToId" + cl + "</a>";
                jQuery("#rowed2").jqGrid('setRowData', ids[i], {act: be + se + ce});
                jQuery("#rowed2").jqGrid('setRowData', ids[i], {link: link});
            }
        },
        editurl: "update.php"

    }).jqGrid('navGrid', "#prowed2", {edit: true, add: true, del: true, search: true},
    {height: 400, width: 420, savekey: [true, 13], navkeys: [true, 38, 40], reloadAfterSubmit: true, jqModal: false, closeOnEscape: true, url: 'update.php', bottominfo: "Fields marked with (*) are required"}, // edit options

    {height: 360, width: 400, savekey: [true, 13], navkeys: [true, 38, 40], reloadAfterSubmit: false, jqModal: false, closeOnEscape: true, url: 'add.php', bottominfo: "Fields marked with (*) are required"}, // add options 
    {height: 360, width: 400, savekey: [true, 13], navkeys: [true, 38, 40], reloadAfterSubmit: false, jqModal: false, closeOnEscape: true, url: 'delete.php', bottominfo: "Fields marked with (*) are required"}, // add options 
    {closeOnEscape: true}, // search options 
    {navkeys: [true, 38, 40], height: 400, jqModal: false, closeOnEscape: true}
    ) 
//jQuery("#rowed2").jqGrid('navGrid', "#prowed2", {edit: false, add: false, del: false});

});

function checkvalidname(value, colname){
    var name,name1;
   
    var rowId =$("#rowed2").jqGrid('getGridParam','selrow');  
    lastrow = rowId;
    var rowData = jQuery("#rowed2").getRowData(rowId);

    if(colname === 'Name'){
        name = value;
        name1 = rowData['add'];
        if (name > name1){
            jQuery("#rowed2").setCell (rowId,'name','',{background:'#ff0000'});
            return [false,"NAME MUST < NAME1"];

        }
        else{ 
            return [true,""];
        }
    }
    else{
        name1 = value;
        name = rowData['name'];
        if (name > name1){
        jQuery("#rowed2").setCell (rowId,'add','',{background:'#ff0000'});
        return [false,"NAME MUST < NAME1"];
        
    }
    else{ 
        return [true,""];
    }
         
    }
    
   
}



