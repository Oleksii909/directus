<script setup lang="ts">
import { useTemplateData } from '@/composables/use-template-data';
import { useVersions } from '@/composables/use-versions';
import { renderStringTemplate } from '@/utils/render-string-template';
import { useCollection } from '@directus/composables';
import { computed, toRefs } from 'vue';
import LivePreview from '../components/live-preview.vue';

const props = defineProps<{
	collection: string;
	primaryKey: string;
}>();

const { collection, primaryKey } = toRefs(props);

const { info: collectionInfo, isSingleton } = useCollection(collection);

const { currentVersion } = useVersions(collection, isSingleton, primaryKey);

const previewTemplate = computed(() => collectionInfo.value?.meta?.preview_url ?? '');

const { templateData: previewData } = useTemplateData(collectionInfo, primaryKey, previewTemplate);

const previewUrl = computed(() => {
	const enrichedPreviewData = {
		...previewData.value,
		$version: currentVersion.value?.key ?? 'main',
	};

	const { displayValue } = renderStringTemplate(previewTemplate.value, enrichedPreviewData);

	return displayValue.value || null;
});

function closePopup() {
	window.close();
}
</script>

<template>
	<LivePreview v-if="previewUrl" :url="previewUrl" in-popup @new-window="closePopup" />
</template>
