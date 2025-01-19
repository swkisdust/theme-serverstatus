<template>
  <div>
    <div class="ui progress success">
      <div class="bar" :style="{ width: progress + '%' }">
        <div class="progress">
          <div>
            <small>{{ progress ? progress : 0 }}%</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ progress?: string }>();
</script>

<style scoped>
/*!
 * # Semantic UI 2.5.0 - Progress Bar
 * http://github.com/semantic-org/semantic-ui/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */

/*******************************
            Progress
*******************************/

.ui.progress {
  position: relative;
  display: block;
  height: 20px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
  background-color: #f5f5f5;
  border-radius: 4px;
  overflow: hidden;
}

/*******************************
            Content
*******************************/

/* Activity Bar */
.ui.progress .bar {
  float: left;
  line-height: 20px;
  font-size: 12px;
  text-align: center !important;
  padding-left: 5px;
  height: 100%;
  background: #888888;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.15);
  transition: width 0.6s ease;
}

/* Percent Complete */
.ui.progress .bar > .progress {
  white-space: nowrap;
  position: absolute;
  width: auto;
  font-size: 0.92857143em;
  top: 30%;
  right: auto;
  left: auto;
  bottom: auto;
  text-shadow: none;
  margin-top: -0.5em;
  font-weight: 400;
  text-align: center;
}

.ui.progress.success .bar {
  background-image: linear-gradient(rgb(92, 184, 92) 0, rgb(68, 157, 68) 100%);
}

.ui.progress.success .bar,
.ui.progress.success .bar::after {
  -webkit-animation: none !important;
  animation: none !important;
}
</style>
