<template>
  <div class="events">
    <h1>Events For Good</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />

    <div class="pagination">
      <router-link
        id="page-prev"
        :to="{ name: 'EventList', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
      >
        <span>&#60; Previous</span>
      </router-link>

      <router-link
        v-for="index in totalPages"
        :key="index"
        :to="{ name: 'EventList', query: { page: index } }"
        :class="[index == page ? activeClass : '']"
      >
        <span>{{ index }}</span>
      </router-link>

      <router-link
        id="page-next"
        :to="{ name: 'EventList', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
      >
        <span>Next &#62;</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import EventCard from "@/components/EventCard.vue";
import store from "@/store/index";

export default {
  name: "EventList",
  props: ["page"],
  components: {
    EventCard, // register it as a child component
  },
  data() {
    return {
      activeClass: "activeClass",
    };
  },
  computed: {
    events() {
      return this.$store.state.events;
    },
    totalPages() {
      return Math.ceil(
        this.$store.state.totalEvents / this.$store.state.perPage
      );
    },
    hasNextPage() {
      return this.page < this.totalPages;
    },
  },
  beforeRouteEnter(to, from, next) {
    store
      .dispatch("fetchEvents", parseInt(to.query.page) || 1)
      .then(next())
      .catch(() => {
        next({ name: "NetworkError" });
      });
  },
  beforeRouteUpdate(to) {
    return store
      .dispatch("fetchEvents", parseInt(to.query.page) || 1)
      .catch(() => {
        return { name: "NetworkError" };
      });
  },
};
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}

.activeClass span {
  font-weight: bold;
  text-decoration: underline;
}
</style>
