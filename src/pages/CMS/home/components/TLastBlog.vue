<template>
	<div class="last-blog">
		<template v-for="(item, i) in blogs.slice(0, 3)" :key="i">
			<!-- screen mobile -->
			<div v-if="$q.screen.lt.sm" class="show-blog" :class="{ 'responsive-blog': true, 'w-100': $q.screen.lt.sm }">
				<img class="circle-photo-blog" :class="{ 'photo-blog-mobile': true, 'w-100': $q.screen.lt.sm }" :src="$s.img.getThumbnail(item)" alt="" />
				<div class="description-blog">
					<router-link :to="{ name: 'Cms.Blog', params: { id: item.id } }" class="heading-card-blogs">{{ item.title }}</router-link>
					<div class="body-description">
						<p v-html="item.summary"></p>
						<span>...</span>
					</div>
					<router-link :to="{ name: 'Cms.Blog', params: { id: item.id } }" class="coninu-description">ادامه مطلب</router-link>
					<span class="date-blog">شنبه ۱۱ آذر ماه ۱۴۰۲</span>
				</div>
			</div>
			<!-- desktop screen -->
			<div v-else class="show-blog" :key="i">
				<img class="circle-photo-blog" :src="$s.img.getThumbnail(item)" alt="" />
				<div class="description-blog">
					<router-link :to="{ name: 'Cms.Blog', params: { id: item.id } }" class="heading-card-blogs">{{ item.title }}</router-link>
					<div class="body-description">
						<p v-html="item.summary"></p>
						<span>...</span>
					</div>
					<router-link :to="{ name: 'Cms.Blog', params: { id: item.id } }" class="coninu-description">ادامه مطلب</router-link>

					<span class="date-blog">شنبه ۱۱ آذر ماه ۱۴۰۲</span>
				</div>
			</div>
		</template>
	</div>
</template>
<script setup>
import { ref } from 'vue';

// variable
const blogs = ref([]);

const getLastBlog = async () => {
	const resBlog = await Service.cms.getPosts('article');
	blogs.value = resBlog;
};
getLastBlog();
</script>
<style lang="scss" scoped src="./TLastBlog.scss">

</style>
