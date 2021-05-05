<?php
// tv
namespace ProcessWire;

// фонова картинка
if($page->page_img){
    $bg = ' style="background-image: url(' . $page->page_img->url . ');"';
}
 // хлібні крихти + заголовок сторінки
echo '
    <div id="breadcrumbs"' . $bg . '>
        <div class="wrap">
            <h1>' . $page->title . '</h1>
            <ul>
 ';
            foreach($page->parents() as $item) {
                echo '<li><a href=' . $item->url . '>' . $item->title . '</a></li>';
            }
            echo '<li class="active">' . $page->title . '</li>';
echo '
            </ul>
        </div>
    </div>
    <!-- #breadcrumbs -->
';

echo '<section id="online-tv"><div class="wrap">';

// назви тарифів з описами та кнопкою замовлення
if ($page->tv_names) {
    echo '<header id="tv-head"><div></div>';
    foreach ($page->tv_names as $key => $value) {
        echo '
        <div>
            <div class="tv-desc">
            <h3>' . $value->tv_name . '</h3>
        ';
        if($value->tv_price == 0 || $value->tv_price == ''){
            echo '<h5>ПРОМО</h5>';
        } else {
            echo '<h4>' . $value->tv_price . '</h4>';
        }
        echo '
                <span>' . $value->tv_desc . '</span>
            </div>
        ';

        echo '<div id="tv-head-' . $key . '" class="hide"><div></div></div>';

        echo '
        </div>';
    }

    echo '</header><!-- #tv-head -->';
}

// динамічно виводимо тут канали:
echo '<div id="tv-content"></div>';

echo '</div></section><!-- #online-tv -->';