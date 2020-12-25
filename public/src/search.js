$(document).ready(function() {
    // $("input").focusout(function() {
    //     $('#text').html('');
    //     $('#list-suggesstion').html('');
    //     $(this).val("")
    // });
    $("input").focusin(function() {
        document.getElementById('suggesstion-box').style.display = 'block';
        $('#text').html('');
        $('#list-suggesstion').html('');
    });
    $('#list-suggesstion').focusin(function() {
        document.getElementById('suggesstion-box').style.display = 'block';
    });
});

const rowUser = (id) => {
    $.ajax({
        url: "/user",
        type: "POST",
        data: {
            userId: id
        },
        success: function(result) {
            $.each(result, function(key, val) {
                $('.col-md-10').html(val.name);
                document.getElementById('suggesstion-box').style.display = 'none';
                $("#searchName").val("")
            })
        }
    });
}

const addFriend = (id) => {
    $.ajax({
        url: "/addFriend",
        type: "POST",
        data: {
            friendId: id
        },
        success: function(result) {
            $.each(result, function(key, val) {
                // $('.col-md-10').html(val.name);
                // document.getElementById('suggesstion-box').style.display = 'none';
                $(this).html("hủy lời mời")
            })
        }
    });
}



$(function() {
    $("#searchName").autocomplete({
        source: function(request, response) {
            $.ajax({
                url: "/search",
                type: "GET",
                dataType: 'json',
                data: request, // request is the value of search input
                success: function(data) {
                    var text = document.getElementById('searchName').value;

                    $('#list-suggesstion').html('');

                    if (data.length != 0) {
                        $('#text').html(`<div class="content-search"><span class="icon-search">
                        <i class="fas fa-search"></i></span> &nbsp tìm kiếm tin nhắn cho "` + text + `"</div>
                        <div class="title-search" style="padding: 10px 15px 10px 15px;">Nguời dùng</div>`);
                        $.each(data, function(key, value) {
                            $('#list-suggesstion').append(`<div  id="row-search" class="row-search">
                            <div onclick=rowUser("` + value.id + `")>
                            <img src="assets/image/user.jpg" height= "30px" width="30px" class="image-user-search" />
                            ` + value.name + `</div>
                            <div class="addFriend">
                            <button onclick=addFriend("` + value.id + `") class="friend friend` + value.id + `">` + buttonFriend(value.id) + `</button>
                            <div id="huy` + value.id + `" class="huy huy` + value.id + `"></div>
                            </div>
                            </div>`);
                        });
                    } else {
                        $('#text').html(`<div class="content-search"><span class="icon-search">
                        <i class="fas fa-search"></i></span> &nbsp tìm kiếm tin nhắn cho "` + text + `"</div>`);
                        $('#list-suggesstion').html(`<div style="text-align: center;padding-top:20px">
                        <div style="font-size: 18px;color: #F1FFFF">Không tìm thấy kết quả</div>
                        <div style="padding: 5px 10px 0px 10px">chúng tôi không tìm được kết quả nào cho "` + text + `".Hãy thử kiểm tra chính tả hoặc dùng từ hoàn chỉnh </div></div>`)
                    }
                },
                error: function(err) {
                    console.log(err);
                }
            });
        },

        // The minimum number of characters a user must type before a search is performed.
        minLength: 1,
        select: function(event, ui) {
            if (ui.item) {
                $('#searchName').text(ui.item.label);
            }
        }
    });

});