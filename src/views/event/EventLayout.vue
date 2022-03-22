<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <div id="nav">
      <router-link :to="{ name: 'EventDetails' }">Details</router-link>
      |
      <router-link :to="{ name: 'EventRegister' }">Register</router-link>
      |
      <router-link :to="{ name: 'EventEdit' }">Edit</router-link>
    </div>
    <router-view :event="event" />
  </div>
</template>

<script>
export default {
  props: ["id"],
  created() {
    this.$store.dispatch("fetchEvent", this.id).catch((error) => {
      if (error.response && error.response.status == 404) {
        this.$router.push({
          name: "404Resource",
          params: { resource: "event" },
        });
      } else {
        this.$router.push({ name: "NetworkError" });
      }
    });
  },
  computed: {
    event() {
      return this.$store.state.event;
    },
  },
};
</script>
