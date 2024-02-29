<template lang="pug">
main.main.with-new-search-box
  #r_01.r_box.no_select
    .back_r
      picture.back-picture
        img#back-image-blur(src="~assets/cms/slide.jpg", alt="back-image-blur")
      picture.back-picture
        img#back-image.fade-on-load(src="~assets/cms/slide(1).jpg", alt="back-image", style="opacity: 1")
      .effect_bg
      .shadow_bg
    .front_r.front_home
      header.r_box
        .r_right
          .logo
            h2.logo_heading
              a(href="./", :title="headerText") {{headerText}}
        .r_left#r_01_01
          .r_box
            .r_right

              .r_device_menu
                ul.main
                  li.m_box.active#r_01_01_01.t-menu-li
                    router-link.t-menu-link(:to="{name:'Cms.Hotel.Index'}")
                      span هتل
                    .sub_menu
                      .m_init
                        ul
                          li
                            router-link(:to="{name:'Cms.Hotel.Index'}")
                              span هتل های نجف
                              span تخفیف تا 10٪
                      .m_init.fill
                        ul
                          li
                            router-link(:to="{name:'Cms.Hotel.Index'}")
                              span هتل های کربلا
                              span تخفیف تا 10٪
                      .m_init.text-align-right
                        a.m_init_button(href="./IranHotels.html")
                  li#r_01_01_02.m_box.t-menu-li
                    router-link.t-menu-link(:to="{name:'Cms.Package'}")
                      span تور
                    .sub_menu
                      .m_init.fill
                        ul
                          li
                            router-link(:to="{name:'Cms.Package'}", title="تور کربلا")
                              span تور کربلا
                              span تخفیف تا 10٪
                      .m_init.fill
                        ul.
                  li.t-menu-li
                    router-link.t-menu-link(:to="{name:'Cms.AboutUs'}")
                      span درباره ما
                  li.last-menu-item.t-menu-li
                    router-link.t-menu-link(:to="{name:'Cms.ContactUs'}")
                      span تماس با ما
                  li.check_reserve
                    div(style="vertical-align:baseline")
                      router-link.name(:to="{name:'Admin'}",target="_blank" , style="height: 8px;")
                        | پنل ادمین
                        span.cmsIcon-invoice
                .popup_header
                  button.auto_label.ui_focus_close(type="button")
                    span.cmsIcon-close
            .r_left
              .user_access.login_popup
                .name_btn
                  div.cmsIcon-user(v-if="$u.auth.isAuthenticated()&&$q.screen.lt.md", @click="$refs.dropdown.show()")
                  router-link.cmsIcon-log-in(v-if="!$u.auth.isAuthenticated() && $q.screen.lt.md" :to="{name:'Login'}" )
                  span
                    router-link.name(v-if="!$u.auth.isAuthenticated() && $q.screen.gt.sm" :to="{name:'Login'}" ) وارد شوید / ثبت نام
                    q-btn-dropdown(ref="dropdown" v-else v-show="$q.screen.gt.sm"  :label="$t('cms.hello') +'!'+ user?.person?.name" icon="las la-user",style="position: relative;")
                      q-list
                        q-item(clickable v-close-popup @click="userAcountHandler")
                          q-item-section(avatar)
                            q-avatar(icon="las la-user", text-color="black")
                          q-item-section
                            q-item-label {{ $t('cms.userAccount') }}
                        q-separator
                        q-item(clickable v-close-popup)
                          q-item-section(avatar)
                            q-avatar(icon="las la-envelope", text-color="black")
                          q-item-section
                            q-item-label {{ $t('cms.newMessages') }}
                        q-separator
                        q-item(clickable v-close-popup)
                          q-item-section(avatar)
                            q-avatar(icon="las la-star", text-color="black")
                          q-item-section
                            q-item-label {{ $t('cms.newFavorites') }}
                        q-separator
                        q-item(clickable v-close-popup @click="logout")
                          q-item-section(avatar)
                            q-avatar(icon="las la-power-off", ext-color="black")
                          q-item-section
                            q-item-label {{ $t('logout') }}
              .search_btn
                span.cmsIcon-search
            span.device_menu.hidden()
              span.cmsIcon-bars
                q-menu(style="min-width: 105%; background-color: rgba(49,49, 49, 0.9);" class="text-white" anchor="center middle" self="center middle")
                  q-list
                    q-item(clickable)
                      q-avatar(v-close-popup icon="las la-times",)
                    q-item(clickable, v-close-popup)
                      q-item-section
                        router-link(:to="{name:'Cms.Hotel.Index'}") هتل
                    q-item(clickable, v-close-popup)
                      q-item-section
                        router-link(:to="{name:'Cms.Package'}") تور
                    q-separator
                    q-item(clickable, v-close-popup)
                      q-item-section
                        router-link(:to="{name:'Cms.AboutUs'}") درباره ما
                    q-item(clickable, v-close-popup)
                      q-item-section
                        router-link(:to="{name:'Cms.ContactUs'}") تماس با ما
                    q-item(clickable, v-close-popup)
                      q-item-section
                        router-link(:to="{name:'Admin'}") پنل ادمین
                    q-separator
            .phone_number
              a.hidden(href="tel:02153681", aria-label="Phone Number")
                span.cmsIcon-telephone
              span.back_bg
              span.text.text-animation
                span 5
                span 3
                span 6
                span 8
                span 1
            a.b2b-landing(href="./landings/b2bLanding.html", rel="nofollow")
              svg(width="208", height="33", viewBox="0 0 208 33")
                path(d="M0 0H208V29.5C208 32 206 33 204 33H38C14 33 8.5 13.5 0 0Z", fill="#F6F6F6")
              span.b2b-landing__text آژانس ها، شرکت و سازمان ها
            .clr
        .clr
      .r_box#r_01_02
        .r_right
          .text_bn_box
            h1.item_1 رزرو هتل و تورهای زیارتی
            p.item_2 ارائه دهنده رسمی خدمات تخصصی رزرواسیون هتل و تورهای زیارتی در کشور
        .clr
        span.scroll_body#GoToSearchForm
q-layout(view="")
  q-page-container
    q-page(padding)
        .row.justify-center
          .col-xs-12.q-gutter-sm(style="padding-bottom:50px;max-width: 1200px;")
            .q-pa-sm
              router-view
footer.footer
  .hidden_mobile.footer-background
  .r_box.services_support
    .front_r
      .services_support_text
        p.device_hidden
          | با خدمات ۲۴ ساعته
          span مرکز رزرواسیون هتل ها و اماکن زیارتی (نظر گشت طاها)
          | ، در ۷ روز هفته همراه ما باشید:
        p.desktop_hidden.hidden خدمات ۲۴ ساعته ، در ۷ روز هفته
      .services_support_tell
        span.cmsIcon-phone(href="tel:02153681")
        p.phone_number_text(href="tel:02153681")
          span.phone_number_red 021
          span.phone_number_grey 53681
  .r_box.section_one_box
    .front_r
      .r_right
        .newsletter_group
          p.news-alert
          label.auto_label عضویت در خبرنامه ایمیلی :
          form.newsletter_form(method="post", action="./newsLetter/index")
            input.auto_label.email_input#email(type="email", name="email", placeholder="پست الکترونیکی خود را وارد نمایید...")
            button.auto_label(type="submit") ارسال / عضویت
            div(data-lastpass-icon-root="true", style="position: relative !important; height: 0px !important; width: 0px !important; float: left !important")
              template(shadowrootmode="open")
          p
            span.cmsIcon-smartphone.text_red
            |	برای عضویت در
            span.text_white خبرنامه
            |	پیامکی، عدد

            span.text_red 1
            |	را به شماره
            span.text_red 312342444
            |	پیامک کنید.

      .r_left
        .certificate_group
          .certificate_item
            img(src="~assets/cms/certificate_one.png", alt="گواهینامه اول")
          .certificate_item
            img(src="~assets/cms/certificate_two.png", alt="گواهینامه دوم")
          .certificate_item
            img(src="~assets/cms/certificate_three.png", alt="گواهینامه سوم")
          .certificate_item
            img(src="~assets/cms/certificate_95.png", alt="اقامت 24 جشنواره وب 95")
          .certificate_item
            img(src="~assets/cms/certificate_four.png", alt="گواهینامه چهارم")
  .r_box.section_two_box
    .front_r
      .footer_about_group
        label.auto_label نظر گشت طاها، مرکز رسمی رزرواسیون هتل ها و اماکن زیارتی
        p
          | نظر گشت طاها به عنوان مرکز رسمی رزرواسیون هتلهای کربلا در ایران که موافقت اصولی سازمان حج و زیارت و گردشگری را در این زمینه دارا است، فعالیت خود را در زمینه رزرواسیون و اسکان مکانیزه گردشگران از سال ۱۳۸۵ آغاز کرد...
          a.more_about_link(href="./content/about.html", target="_blank", title="درباره نظر گشت طاها بیشتر بدانید") بیشتر
        .social_group
          .social_group_item.social_aparat
            a(rel="nofollow", href="http://www.aparat.com/nazari-taha", title="نظر گشت طاها را در صفحه آپارات دنبال کنید", target="_blank")
              p.text_indent
                span نظر گشت طاها را در صفحه آپارات دنبال کنید
          .social_group_item.social_telegram
            a(rel="nofollow", href="https://telegram.me/nazari-taha", title="نظر گشت طاها را در کانال تلگرام دنبال کنید", target="_blank")
              p.text_indent
                span نظر گشت طاها را در کانال تلگرام دنبال کنید
          .social_group_item.social_instagram
            a(rel="nofollow", href="https://www.instagram.com/nazari-tahacom", title="نظر گشت طاها را در صفحه اینستاگرام دنبال کنید", target="_blank")
              p.text_indent
                span نظر گشت طاها را در صفحه اینستاگرام دنبال کنید
          .social_group_item.social_linkedin
            a(rel="nofollow", href="http://www.linkedin.com/company/nazari-taha", title="نظر گشت طاها را در صفحه لینکدین دنبال کنید", target="_blank")
              p.text_indent
                i.icomoon.cmsIcon-social_linkedin
                span نظر گشت طاها را در صفحه لینکدین دنبال کنید
          .social_group_item.social_twitter
            a(rel="nofollow", href="https://twitter.com/nazari-tahacom?s=09", title="نظر گشت طاها را در صفحه تویتتر دنبال کنید", target="_blank")
              p.text_indent
                span نظر گشت طاها را در صفحه تویتتر دنبال کنید
      .footer_menus_group
        .footer_menus_one
          label.auto_label فهرست عناوین
          ul
            li
              a(href="./", title="رزرو هتل") رزرو هتل
            li
              router-link(:to="{name:'Cms.Hotel.Index'}", title="هتل های عراق") هتل های عراق
            li
              a(href="./Maps.html", title="نقشه راهنمای گردشگری") نقشه راهنمای گردشگری
            li
              a(href="./Content/FAQ.html", title="پرسش های متداول") پرسش های متداول
            li
              a(href="./public/app/nazari-taha.apk", target="_blank", title="اپلیکیش موبایل") دانلود مستقیم اپلیکیشن اندروید
            li
              a(href="https://play.google.com/store/apps/details?id=app.nazari-taha.com", rel="nofollow", target="_blank", title="اپلیکیش موبایل") دانلود اپلیکیشن از پلی استور
        .footer_menus_two
          label.auto_label پر بازدیدترین های وبلاگ
          ul
      .footer_contact_group
        .certificate_group
          .certificate_item
            a(referrerpolicy="origin", target="_blank", href="https://trustseal.enamad.ir/?id=348950&Code=F949gq30ItVaVpEpNqhT")
              img#F949gq30ItVaVpEpNqhT(referrerpolicy="origin", src="https://Trustseal.eNamad.ir/logo.aspx?id=348950&Code=F949gq30ItVaVpEpNqhT", alt, style="cursor:pointer")
            a(href="https://trustseal.enamad.ir/?id=348950&Code=F949gq30ItVaVpEpNqhT", rel="nofollow", referrerpolicy="origin", target="_blank")
              img(src="~assets/cms/enamad.png", alt="نماد اعتماد الکترونیکی")
          .certificate_item
            img(src="~assets/cms/social-marketing.png", alt="عضو اتحادیه کشوری کسب و کار های مجازی")
          .certificate_item
            img(src="~assets/cms/haj-ziarat.png", alt="عضو سازمان حج و زیارت",style="height: 90px;")
        .contact_website
          p
            span.contact_group_label آدرس تهران:
            | {{ address }}
          p
            span.contact_group_label تلفن :
            span.device_hidden 53681
            span.desktop_hidden.hidden
              a(href="tel:02153681") 53681
          p
            span.contact_group_label پست الکترونیک :
            |
            span(style="font-family: tahoma") info@tahatour.com
  .copyright
    .front_r
      .r_right
        p.
          تمامی خدمات این وب سایت دارای مجوزهای لازم از مراجع مربوطه می باشد و فعالیت های این سایت تابع قوانین و مقررات جمهوری اسلامی ایران است.
      .r_left
        p
          | ۱۳۸۸-۱۴۰۲©
          a.website_link(href="./", :title="headerText", target="_blank") نظر گشت طاها
</template>
<style src="../css/cms/vars.scss" lang="scss"></style>
<style src="../css/cms/icon.scss" lang="scss"></style>
<style src="../css/cms/index.scss" scoped lang="scss"></style>
<style lang="scss">
body {
	overflow-x: hidden;
}

.q-list {
	position: relative !important;
}

.q-page-sticky {
	z-index: 1000;

	&.flex-center {
		justify-content: inherit;
	}

	&.fixed-bottom-right {
		right: 0;
		left: inherit;
	}
}

.t-menu-li {
	padding: 0 !important;
	margin-left: 0 !important;
}

.t-menu-link {
	padding: 15px 15px 15px 15px;
	display: block;
}
</style>
<style scoped>
.name {
	margin-top: 1rem;
}
</style>

<script lang="ts">
import { changeImagesBaseUrl, removeAuthentication } from 'utils';
import { defineComponent, onMounted, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
	setup() {
		const router = useRouter();
		//
		const init = async () => {};
		//
		const logout = () => {
			removeAuthentication();
			window.location.reload();
		};

		const userAcountHandler = () => {
			router.push('/user-panel');
		};
		//
		onBeforeMount(() => {
			changeImagesBaseUrl(document.documentElement);
		});
		//
		onMounted(async () => await init());
		//
		return {
			headerText: 'نظر گشت طاها - مرکز ملی رزرواسیون عتبات عالیات تحت نظر حج و زیارت',
			address: 'تهران ، اتوبان بعثت نبش ۲۱ متری بعثت پلاک ۹۲',
			user: Utils.auth.getMe(),
			logout,
			userAcountHandler,
		};
	},
});
</script>

