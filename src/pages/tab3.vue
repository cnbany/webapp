<template>
	<div>
		<Button size="large" @click="load">异步读取</Button>
		<div>{{suggests}}</div>
		<img src="../image/demo.jpg" />
		<img src="../image/icon.png" />
	</div>
</template>
<script>
	import { TAOBAO } from "@/libs/api";
	import { memory } from "@/libs/utils";
	import { Button, Toast } from "vant";

	window.tab3Vue = {
		name: "tab3",
		components: { Button, Toast },
		data() {
			return {
				suggests: ""
			};
		},
		methods: {
			async load() {
				Toast.loading({
					mask: true,
					forbidClick: true,
					duration: 0,
					message: "Loading..."
				});
				try {
					let suggests = await TAOBAO.get(
						"https://suggest.taobao.com/sug?code=utf-8&q=华为"
					);

					// Example for the global data
					memory.set("suggests", suggests);
					this.suggests = memory.get("suggests");

					Toast.clear();
				} catch (e) {
					Toast.fail(e.msg);
				}
			}
		}
	};

	export default window.tab3Vue;
</script>
<style scoped>
</style>
