const chart = [];
$(document).ready(function () {
  $("#submit").click(function () {
    var sku = $("#proSKU").val();
    var name = $("#proName").val();
    var price = $("#proPrice").val();
    var qty = $("#proQty").val();
    var array = {};
    array.sku = sku;
    array.name = name;
    array.price = price;
    array.qty = qty;
    //valid(sku, name, price, qty);
    chart.push(array);
    display(chart);
    $("#success").show(500);
  });

  function display(chart) {
    var dataContainer = "";
    dataContainer +=
      "<table><tr><th>Product SKU</th><th>Product Name</th><th>Product Price</th><th>Product Quantity</th><th>Action 1</th><th>Action 2</th></tr>";
    for (var i = 0; i < chart.length; i++) {
      dataContainer +=
        "<tr><td>" +
        chart[i].sku +
        "</td><td>" +
        chart[i].name +
        "</td><td>$ " +
        chart[i].price +
        "</td><td>" +
        chart[i].qty +
        "</td><td><a href='#' class='edit' data-id= " +
        chart[i].sku +
        " >Edit</a>\
        </td><td><a href='#' class='delete' data-id= " +
        chart[i].sku +
        ">Delete</a></td></tr>";
    }
    dataContainer += "</table>";
    $("#result").html(dataContainer);

    //this is used to display the successfull added product

    //using this function to modify the buttons on EDIT click
    $(".edit").on("click", function () {
      $("#submit").hide();
      $("#update").show();
      $("#success").hide();
      var fetchSKU = $(this).data("id");
      return edit(fetchSKU);
    });
    $(".delete").on("click", function () {
      $("#success").hide();
      $("#added").hide();
      $("#fail").hide();
      var delId = $(this).data("id");
      console.log(delId);
      return remove(delId);
    });
  }

  //used to hide on clicking the X option in notification
  $(".close").click(function () {
    $("#success").hide("slow");
    $("#fail").hide(1000);
    $("#delNotify").hide(1000);
    $("added").hide(1000);
  });

  function edit(id) {
    var getProd = object(id);
    $("#proSKU").val(getProd.sku);
  }

  $("#update").click(function () {
    var upId = $("#proSKU").val();
    var upName = $("#proName").val();
    var upPrice = $("#proPrice").val();
    var upQty = $("#proQty").val();
    for (var i = 0; i < chart.length; i++) {
      if (upId == chart[i].sku) {
        chart[i].sku = upId;
        chart[i].name = upName;
        chart[i].price = upPrice;
        chart[i].qty = upQty;
      }
    }
    display(chart);
    $("#added").show(1000);
  });
  function object(id) {
    for (var i = 0; i < chart.length; i++) {
      if (id == chart[i].sku) {
        console.log(id, chart[i].sku);
        return chart[i];
      }
    }
  }

  function remove(delId) {
    var delproId = removeobject(delId);
    $("#proSKU").val(delproId.sku);
    var del = $("#proSKU").val();
    for (var i = 0; i < chart.length; i++) {
      if (del == chart[i].sku) {
        var index = chart.indexOf(chart[i].sku);
        console.log("index value is :" + index);
        console.log("going to delete");
        chart.splice(index, 4);
      }
    }
    $("#delNotify").show(1000);
    display(chart);
  }

  function removeobject(delId) {
    for (var i = 0; i < chart.length; i++) {
      if (delId == chart[i].sku) {
        console.log(delId, chart[i].sku);
        return chart[i];
      }
    }
  }
});

/*
    $("body").on("click", function(){
      function valid(id, name, price) {
        for (var i = 0; i < chart.length; i++) {
          if (sku == chart[i].sku) {
            window.alert("This product ID already exist !!!");
            $("fail").toggle();
            return exit;
          } else {
            if (sku.length == 0 || name.length == 0 || price.length == 0 || qty.length==0) {
              window.alert("Please fill all the fields.");
              $("fail").toggle();
              return exit;
            }
          }
        }
      }
    });*/
