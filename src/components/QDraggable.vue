<template lang="pug">
div(@dragover="onDragOver", @drop="onDrop")
	slot
</template>
<style lang="sass" scoped>
.drop-target
  background-color: gainsboro

.drag-enter
  outline-style: dashed

</style>
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'QDraggable',
  props: {},
  setup(props: any) {
    const status1 = ref([] as any);
    return {
      status1,

handler1(mutationRecords:any) {
        status1.value = [];
        for (const index in mutationRecords) {
          const record = mutationRecords[index];
          const info = `type: ${record.type}, nodes added: ${
            record.addedNodes.length > 0 ? 'true' : 'false'
          }, nodes removed: ${
            record.removedNodes.length > 0 ? 'true' : 'false'
          }, oldValue: ${record.oldValue}`;
          status1.value.push(info);
        }
      },

     // store the id of the draggable element
      onDragStart(e:any) {
        e.dataTransfer.setData('text', e.target.id);
        e.dataTransfer.dropEffect = 'move';
      },

      onDragEnter(e:any) {
        // don't drop on other draggables
        if (e.target.draggable !== true) {
          e.target.classList.add('drag-enter');
        }
      },

      onDragLeave(e:any) {
        e.target.classList.remove('drag-enter');
      },

      onDragOver(e:any) {
        e.preventDefault();
      },

      onDrop(e:any) {
        e.preventDefault();

        // don't drop on other draggables
        if (e.target.draggable === true) {
          return;
        }

        const draggedId = e.dataTransfer.getData('text');
        const draggedEl = document.getElementById(draggedId);

        // check if original parent node
        if (draggedEl?.parentNode === e.target) {
          e.target.classList.remove('drag-enter');
          return;
        }

        // make the exchange
        draggedEl?.parentNode?.removeChild(draggedEl);
        e.target.appendChild(draggedEl);
        e.target.classList.remove('drag-enter');
      },
    };
  },
});
</script>
