<template lang="pug">
.q-pa-md(v-if="type=='grid'")
	.fixed-full.image-gallery__blinder.bg-grey-8(:class="indexZoomed !== void 0 ? 'image-gallery__blinder--active' : void 0", @click="zoomImage()")
		.row.justify-center.q-gutter-sm.q-mx-auto.scroll.relative-position(style="max-width: 80vw; max-height: 80vh")
			t-image.image-gallery__image(v-for="(src, index) in images", :key="index", :ref="el => { thumbRef[index] = el }", :style="index === indexZoomed ? 'opacity: 0.3' : void 0", :src="src", @click="zoomImage(index)").
		t-image.image-gallery__image.image-gallery__image-full.fixed-center(ref="fullRef", :class="indexZoomed !== void 0 ? 'image-gallery__image-full--active' : void 0", :src="images[indexZoomed]", @load="imgLoadedResolve", @error="imgLoadedReject", @click="zoomImage()").
div(v-else)
	q-carousel.rounded-borders(swipeable, animated, v-model="slide", thumbnails, infinite,:autoplay="true")
		q-carousel-slide(v-if="!images?.length",:name="0",:img-src="defaultImage??$s.img.getDefaultImage('noImage')")
		q-carousel-slide(v-else, v-for="(img,index) in images",:name="index", :img-src="(index==slide?$s.img.getImage(img):$s.img.getThumbnail(img))??defaultImage??$s.img.getDefaultImage('noImage')")
</template>

<style lang="scss">
.image-gallery {
	&__image {
		border-radius: 3%/5%;
		width: 150px;
		max-width: 20vw;
		cursor: pointer;

		&-full {
			width: 800px;
			max-width: 70vw;
			z-index: 2002;
			pointer-events: none;

			&--active {
				pointer-events: all;
			}
		}
	}
	&__blinder {
		opacity: 0;
		z-index: 2000;
		pointer-events: none;
		transition: opacity 0.3s ease-in-out;

		&--active {
			opacity: 0.6;
			pointer-events: all;

			+ div > .image-gallery__image {
				z-index: 2001;
			}
		}
	}
}
</style>

<script>
import { ref, onBeforeUpdate, defineComponent } from 'vue';
import { morph } from 'quasar';
import TImage from '@components/TImage.vue';

export default defineComponent({
	props: { images: Array, type: String, defaultImage: String },
	components: { TImage },
	setup() {
		const thumbRef = ref([]);
		const fullRef = ref(null);

		const indexZoomed = ref(void 0);
		const imgLoaded = {
			promise: Promise.resolve(),
			resolve: () => {},
			reject: () => {},
		};

		function imgLoadedResolve() {
			imgLoaded.resolve();
		}

		function imgLoadedReject() {
			imgLoaded.reject();
		}

		function zoomImage(index) {
			console.log('zoom');
			const indexZoomedState = indexZoomed.value;
			let cancel = void 0;

			imgLoaded.reject();

			const zoom = () => {
				if (index !== void 0 && index !== indexZoomedState) {
					imgLoaded.promise = new Promise((resolve, reject) => {
						imgLoaded.resolve = () => {
							imgLoaded.resolve = () => {};
							imgLoaded.reject = () => {};

							resolve();
						};
						imgLoaded.reject = () => {
							imgLoaded.resolve = () => {};
							imgLoaded.reject = () => {};

							reject();
						};
					});

					cancel = morph({
						from: thumbRef.value[index].$el,
						to: fullRef.value.$el,
						onToggle: () => {
							indexZoomed.value = index;
						},
						waitFor: imgLoaded.promise,
						duration: 400,
						hideFromClone: true,
						onEnd: (end) => {
							if (end === 'from' && indexZoomed.value === index) {
								indexZoomed.value = void 0;
							}
						},
					});
				}
			};

			if (indexZoomedState !== void 0 && (cancel === void 0 || cancel() === false)) {
				morph({
					from: fullRef.value.$el,
					to: thumbRef.value[indexZoomedState].$el,
					onToggle: () => {
						indexZoomed.value = void 0;
					},
					duration: 200,
					keepToClone: true,
					onEnd: zoom,
				});
			} else {
				zoom();
			}
		}

		// Make sure to reset the dynamic refs before each update.
		onBeforeUpdate(() => {
			thumbRef.value = [];
		});

		return {
			slide: ref(0),
			thumbRef,
			fullRef,
			indexZoomed,
			zoomImage,
			imgLoadedResolve,
			imgLoadedReject,
		};
	},
});
</script>
