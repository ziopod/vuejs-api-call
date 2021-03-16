<template>
  <div>
    <h1>{{ $static.metadata.siteName }}</h1>
    <slot />
  </div>
</template>
<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>