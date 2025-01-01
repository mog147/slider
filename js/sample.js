//modaal-----------------------------------------

//初回のみモーダルをすぐ出す判定。flagがモーダル表示のstart_open後に代入される
var access = $.cookie('access')
if(!access){
    flag = true;
    $.cookie('access', false);
}else{
    flag = false	
}

//モーダル表示
$(".modal-open").modaal({
start_open:flag, // ページロード時に表示するか
overlay_close:true,//モーダル背景クリック時に閉じるか
before_open:function(){// モーダルが開く前に行う動作
    $('html').css('overflow-y','hidden');/*縦スクロールバーを出さない*/
},
after_close:function(){// モーダルが閉じた後に行う動作
    $('html').css('overflow-y','scroll');/*縦スクロールバーを出す*/
}
});

//slider-----------------------------------------
$('.slider').slick({
    autoplay: true,//自動的に動き出すか。初期値はfalse。
    infinite: true,//スライドをループさせるかどうか。初期値はtrue。
    slidesToShow: 2,//スライドを画面にx枚見せる
    slidesToScroll: 1,//1回のスクロールでx枚の写真を移動して見せる
    prevArrow: '<div class="slick-prev"></div>',//矢印部分PreviewのHTMLを変更
    nextArrow: '<div class="slick-next"></div>',//矢印部分NextのHTMLを変更
    dots: false,//下部ドットナビゲーションの表示
    responsive: [
        {
        breakpoint: 769,//モニターの横幅が769px以下の見せ方
        settings: {
            slidesToShow: 2,//スライドを画面に2枚見せる
            slidesToScroll: 1,//1回のスクロールで2枚の写真を移動して見せる
        }
    },
    {
        breakpoint: 426,//モニターの横幅が426px以下の見せ方
        settings: {
            slidesToShow: 1,//スライドを画面に1枚見せる
            slidesToScroll: 1,//1回のスクロールで1枚の写真を移動して見せる
        }
    }
]
});

// tab-----------------------------------------


//任意のタブにURLからリンクするための設定
function GethashID (hashIDName){
	if(hashIDName){
		//タブ設定
		$('.tab li').find('a').each(function() { //タブ内のaタグ全てを取得
			var idName = $(this).attr('href'); //タブ内のaタグのリンク名（例）#lunchの値を取得	
			if(idName == hashIDName){ //リンク元の指定されたURLのハッシュタグ（例）http://example.com/#lunch←この#の値とタブ内のリンク名（例）#lunchが同じかをチェック
				var parentElm = $(this).parent(); //タブ内のaタグの親要素（li）を取得
				$('.tab li').removeClass("active"); //タブ内のliについているactiveクラスを取り除き
				$(parentElm).addClass("active"); //リンク元の指定されたURLのハッシュタグとタブ内のリンク名が同じであれば、liにactiveクラスを追加
				//表示させるエリア設定
				$(".area").removeClass("is-active"); //もともとついているis-activeクラスを取り除き
				$(hashIDName).addClass("is-active"); //表示させたいエリアのタブリンク名をクリックしたら、表示エリアにis-activeクラスを追加	
			}
		});
	}
}

//タブをクリックしたら
$('.tab a').on('click', function() {
	var idName = $(this).attr('href'); //タブ内のリンク名を取得	
	GethashID (idName);//設定したタブの読み込みと
	return false;//aタグを無効にする
});


// 上記の動きをページが読み込まれたらすぐに動かす
$(window).on('load', function () {
    $('.tab li:first-of-type').addClass("active"); //最初のliにactiveクラスを追加
    $('.area:first-of-type').addClass("is-active"); //最初の.areaにis-activeクラスを追加
	var hashName = location.hash; //リンク元の指定されたURLのハッシュタグを取得
	GethashID (hashName);//設定したタブの読み込み
});


// accordion-----------------------------------------

//アコーディオンをクリックした時の動作
$('.title').on('click', function() {//タイトル要素をクリックしたら
	$('.box').slideUp(500);//クラス名.boxがついたすべてのアコーディオンを閉じる
    
	var findElm = $(this).next(".box");//タイトル直後のアコーディオンを行うエリアを取得
    
	if($(this).hasClass('close')){//タイトル要素にクラス名closeがあれば
		$(this).removeClass('close');//クラス名を除去    
	}else{//それ以外は
		$('.close').removeClass('close'); //クラス名closeを全て除去した後
		$(this).addClass('close');//クリックしたタイトルにクラス名closeを付与し
		$(findElm).slideDown(500);//アコーディオンを開く
	}
});

//ページが読み込まれた際にopenクラスをつけ、openがついていたら開く動作※不必要なら下記全て削除
$(window).on('load', function(){
	$('.accordion-area li:first-of-type section').addClass("open"); //accordion-areaのはじめのliにあるsectionにopenクラスを追加
	$(".open").each(function(index, element){	//openクラスを取得
		var Title =$(element).children('.title');	//openクラスの子要素のtitleクラスを取得
		$(Title).addClass('close');				///タイトルにクラス名closeを付与し
		var Box =$(element).children('.box');	//openクラスの子要素boxクラスを取得
		$(Box).slideDown(500);					//アコーディオンを開く
	});
});

// news-----------------------------------------


var slider;
var sliderFlag = false;
var breakpoint = 768;//768px以下の場合
  
function sliderSet() {

        var windowWidth = window.innerWidth;

        if (windowWidth >= breakpoint && !sliderFlag) {//768px以上は1行でスライダー表示

            slider = $('.news').bxSlider({

            touchEnabled:false,//リンクを有効にするためスライドをマウスでドラッグした際にスライドの切り替えを可能にする機能を無効化
			mode: 'vertical',//縦スライド指定
			controls: false,//前後のコントロールを表示させない。
			auto: 'true',//自動的にスライド
			pager: false//ページ送り無効化

		});
            sliderFlag = true;

        } else if (windowWidth < breakpoint && sliderFlag) {
            
            slider.destroySlider();//bxSliderのOptionであるdestroySliderを使用してスライダーの動きを除去
            sliderFlag = false;
        }

    }

$(window).on('load resize', function() {
        sliderSet();
});
 

// ◆タブレット以下も1行で表示させたい場合は下記のみの記述でOK

$('.news').bxSlider({
touchEnabled:false,//リンクを有効にするためスライドをマウスでドラッグした際にスライドの切り替えを可能にする機能を無効化
mode: 'vertical',
controls: false,
auto: 'true',
pager: false
});

// hamburger-----------------------------------------
$(".openbtn").click(function () {
    $(this).toggleClass('active');
});

$(".openbtn2").click(function () {
    $(this).toggleClass('active');
});

$(".openbtn3").click(function () {
    $(this).toggleClass('active');
});


// slider2-----------------------------------------

//スライド上の設定
$('.slider-top').slick({
    accessibility: false,// 左右矢印ボタンでの切り替えなし
    arrows: false,//左右矢印ボタン表示なし
    autoplay: true,//自動的に動き出すか。初期値はfalse。
    pauseOnHover: false,//オンマウスでスライドを一時停止させるかどうか。初期値はtrue。
    pauseOnFocus: false,//フォーカスした際にスライドを一時停止させるかどうか。初期値はtrue。
    slidesToShow: 1,//スライドを画面に1枚見せる
    slidesToScroll: 1,//1回のスクロールで1枚の写真を移動して見せる
    swipe: false,//タッチスワイプに対応しない
});
//スライド下の設定
$('.slider-bottom').slick({
    accessibility: false,// 左右矢印ボタンでの切り替えなし
    arrows: false,//左右矢印ボタン表示なし
    autoplay: true,//自動的に動き出すか。初期値はfalse。
    pauseOnHover: false,//オンマウスでスライドを一時停止させるかどうか。初期値はtrue。
    pauseOnFocus: false,//フォーカスした際にスライドを一時停止させるかどうか。初期値はtrue。
    slidesToShow: 1,//スライドを画面に1枚見せる
    slidesToScroll: 1,//1回のスクロールで1枚の写真を移動して見せる
    swipe: false,//タッチスワイプに対応しない
    rtl: true,//スライダの表示方向を左⇒右に変更する
});

// gallary-----------------------------------------
//上部画像の設定
$('.gallery').slick({
	infinite: true, //スライドをループさせるかどうか。初期値はtrue。
	fade: true, //フェードの有効化
	arrows: true,//左右の矢印あり
	prevArrow: '<div class="slick-prev"></div>',//矢印部分PreviewのHTMLを変更
	nextArrow: '<div class="slick-next"></div>',//矢印部分NextのHTMLを変更
	asNavFor: '.choice-btn', //連動させるサムネイルのクラス名
});

//選択画像の設定
$('.choice-btn').slick({
	infinite: true, //スライドをループさせるかどうか。初期値はtrue。
	slidesToShow: 4, //表示させるスライドの数
	focusOnSelect: true, //フォーカスの有効化
	prevArrow: '<div class="slick-prev"></div>',//矢印部分PreviewのHTMLを変更
	nextArrow: '<div class="slick-next"></div>',//矢印部分NextのHTMLを変更
	asNavFor: '.gallery', //連動させるスライドショーのクラス名
});

// gallary2-----------------------------------------
$(window).on('load',function(){	//画面遷移時にギャラリーの画像が被らないように、すべての読み込みが終わった後に実行する

    //＝＝＝Muuriギャラリープラグイン設定
    var grid = new Muuri('.grid', {
    
    //アイテムの表示速度※オプション。入れなくても動作します
    showDuration: 600,
    showEasing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
    hideDuration: 600,
    hideEasing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
        
    // アイテムの表示/非表示状態のスタイル※オプション。入れなくても動作します
      visibleStyles: {
        opacity: '1',
        transform: 'scale(1)'
      },
      hiddenStyles: {
        opacity: '0',
        transform: 'scale(0.5)'
      } 
    });
    
    //＝＝＝並び替えボタン設定
    $('.sort-btn ul li').on('click',function(){//並び替えボタンをクリックしたら
        var className = $(this).attr("class")//クリックしたボタンのクラス名を取得
        className = className.split(' '); //「.sort-btn ul li」のクラス名を分割して配列にする
    
        //ボタンにクラス名activeがついている場合
        if($(this).hasClass("active")){	
            if(className[0] != "all"){							//ボタンのクラス名がallでなければ
                $(this).removeClass("active");					//activeクラスを消す
                var selectElms = $(".sort-btn ul li.active");	//ボタン内にactiveクラスがついている要素を全て取得
                if(selectElms.length == 0){						//取得した配列内にactiveクラスがついている要素がなければ
                    $(".sort-btn ul li.all").addClass("active");//ボタンallにactiveを追加し
                    grid.show('');								//ギャラリーの全ての画像を表示
                }else{
                    filterDo();									//取得した配列内にactiveクラスがついている要素があれば並び替えを行う
                }
            }	
        }
        //ボタンにクラス名activeがついていない場合
        else{
            if(className[0] == "all"){							//ボタンのクラス名にallとついていたら
                $(".sort-btn ul li").removeClass("active");		//ボタンのli要素の全てのactiveを削除し
                $(this).addClass("active");						//allにactiveクラスを付与
                grid.show('');									//ギャラリーの全ての画像を表示
            }else{
                if($(".all").hasClass("active")){				//allクラス名にactiveクラスが付いていたら
                    $(".sort-btn ul li.all").removeClass("active");//ボタンallのactiveクラスを消し
                }
                $(this).addClass("active");						//クリックしたチェックボックスへactiveクラスを付与
                filterDo();										//並び替えを行う
            }
    
        }
        
    });
    
    //＝＝＝画像の並び替え設定
    function filterDo(){
        var selectElms = $(".sort-btn ul li.active");	//全てのボタンのactive要素を取得
        var selectElemAry = [];							//activeクラスがついているボタンのクラス名（sortXX）を保存する配列を定義
        $.each(selectElms, function(index, selectElm) {
            var className = $(this).attr("class")		//activeクラスがついている全てのボタンのクラス名（sortXX）を取得
            className = className.split(' ');			//ボタンのクラス名を分割して配列にし、
            selectElemAry.push("."+className[0]);		//selectElemAry配列に、チェックのついたクラス名（sortXX）を追加
        })
        str = selectElemAry.join(',');				//selectElemAry配列に追加されたクラス名をカンマ区切りでテキストにして
        grid.filter(str); 							//grid.filter(str);のstrに代入し、ボタンのクラス名とliにつけられたクラス名が一致したら出現
    }
    
    });