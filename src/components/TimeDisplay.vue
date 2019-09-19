<template>
  <span>
    {{ dateFormatted }}
    <template v-if="includeTime && !(showTimeIfToday && isToday)">
      {{ timeFormatted }}
    </template>
  </span>
</template>

<script>
import dateFns from "date-fns";

export default {
  name: "time-display",
  props: {
    date: {
      type: [Date, String],
      required: true
    },
    options: {
      type: Object,
      default: () => {
        return {
          format: "MMM D, YYYY",
          showTimeIfToday: false,
          timeFormat: "H:mm A",
          includeTime: false
        };
      }
    }
  },
  computed: {
    isToday() {
      return dateFns.isToday(this.date);
    },
    includeTime() {
      return this.options.includeTime;
    },
    showTimeIfToday() {
      return this.options.showTimeIfToday;
    },
    format() {
      return this.options.format || "MMM D, YYYY";
    },
    timeFormat() {
      return this.options.timeFormat || "H:mm A";
    },
    dateFormatted() {
      if (this.showTimeIfToday && this.isToday) {
        return this.timeFormatted;
      }
      return dateFns.format(this.date, this.format);
    },
    timeFormatted() {
      return dateFns.format(this.date, this.timeFormat);
    }
  }
};
</script>
