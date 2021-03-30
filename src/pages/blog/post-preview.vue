<template>
  <section class="post-preview">
    <main class="d-flex flex-column h-100 px-3">
      <b-row no-gutters align-h="between" class="flex-nowrap header">
        <b-col class="pl-2 pl-md-3">
          <div class="title h4"><slot name="title"></slot></div>
          <div class="date">Published on <slot name="date"></slot></div>
        </b-col>
        <b-col cols="auto">
          <b-icon-x
            font-scale="2.5"
            @click="$emit('close')"
            class="cursor-pointer"
          />
        </b-col>
      </b-row>
      <pre class="overflow-auto flex-1 pb-2 px-3 px-sm-4 px-md-5"><slot></slot>
      </pre>
    </main>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
$top: 65px;
$height: calc(100% - 65px);
$container-radius: 25px;
.post-preview {
  position: fixed;
  top: $top;
  width: 100%;
  left: 0;
  height: $height;
  max-height: $height;
  background: white;
  z-index: 1000;
  border-top-left-radius: $container-radius;
  border-top-right-radius: $container-radius;
}
.header {
  padding: 1.5rem $container-radius;
}
pre {
  font-family: inherit;
  white-space: pre-line;

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #9c9c9c;
    outline: transparent;
    border-radius: 25px;
  }
}
</style>