<template>
	<div class="flex w-full column home-page">
		<div class="flex header-page"></div>
		<div class="container column">
			<div class="q-pa-md" style="width: 100%">
				<div class="q-gutter-y-md search-hotel-city" style="width: 100%">
					<q-card class="tab-product">
						<q-tabs
							v-model="tab"
							dense
							class="text-black show-data-reserve"
							active-color="primary"
							indicator-color="primary"
							align="justify"
							narrow-indicator
						>
							<q-tab name="movies" class="tw-p-3 tw-w-[30%]" label="ویلا و آپارتمان" />
							<q-tab name="alarms" class="tw-p-3 tw-w-[30%]" label="تور" />
							<q-tab name="Hotel" class="tw-p-3 tw-w-[30%]" label="هتل" />
						</q-tabs>
						<q-separator />

						<q-tab-panels v-model="tab" animated>
							<q-tab-panel name="Hotel">
								<!-- btn search -->
								<div class="tw-flex">
									<select
										class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
									>
										<option>Really long option that will likely overlap the chevron</option>
										<option>Option 2</option>
										<option>Option 3</option>
									</select>
								</div>
								<!-- slider -->
								<div class="tw-flex tw-w-full">
									<div class="carousel tw-w-[48%]">
										<div class="q-pa-md">
											<q-carousel swipeable animated v-model="slide" thumbnails infinite>
												<q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg" />
												<q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
												<q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
												<q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg" />
											</q-carousel>
										</div>
									</div>
									<div class="tw-w-[52%] tw-pt-4 tw-flex tw-flex-col tw-gap-[30px]">
										<div class="tw-flex tw-w-[100%]">
											<img class="tw-object-fit" src="" alt="" />
										</div>
										<div class="tw-flex tw-w-[100%]">
											<img src="" alt="" />
										</div>
									</div>
								</div>
							</q-tab-panel>

							<q-tab-panel name="alarms">
								<div class="text-h6">Alarms</div>
								Lorem ipsum dolor sit amet consectetur adipisicing elit.
							</q-tab-panel>

							<q-tab-panel name="movies">
								<!-- btn search -->
								<div class="tw-flex">
									<select
										class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
									>
										<option>Really long option that will likely overlap the chevron</option>
										<option>Option 2</option>
										<option>Option 3</option>
									</select>
								</div>
								<!-- slider -->
								<div class="tw-flex tw-w-full">
									<div class="carousel tw-w-[48%]">
										<div class="q-pa-md">
											<q-carousel swipeable animated v-model="slide" thumbnails infinite>
												<q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg" />
												<q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
												<q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
												<q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg" />
											</q-carousel>
										</div>
									</div>
									<div class="tw-w-[52%] tw-pt-4 tw-flex tw-flex-col tw-gap-[30px]">
										<div class="tw-flex tw-w-[100%]">
											<img class="tw-object-fit" src="" alt="" />
										</div>
										<div class="tw-flex tw-w-[100%]">
											<img src="" alt="" />
										</div>
									</div>
								</div>
							</q-tab-panel>
						</q-tab-panels>
					</q-card>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
	name: 'TTab',
	setup() {
		return {
			tab: ref('mails'),
			slide: ref(1),
		};
	},
});
</script>

<style lang=""></style>
