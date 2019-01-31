<template>
  <div id="app">
    <chart :vm='appState.papers'></chart>
    <form v-on:submit.prevent="onSubmit" class="search-box">
      <typeahead
        placeholder="Find the most cited papers by keyword"
        ref:typeahead
        @selected="doSearch"
        :query="appState.query"
        :get-suggestions="getSuggestions"
      ></typeahead>
    </form>

    <div class="help" v-if="!isLoading">
      Most cited works within category.
      <a
        href="#"
        @click.prevent="aboutVisible = true"
        class="highlight"
      >Learn more.</a>
    </div>
    <div v-if='appState.progress.working' class='progress'>
      {{appState.progress.message}}
      {{appState.progress.error}}
    </div>
    <div class="about-line">
      <a class="about-link" href="#" @click.prevent="aboutVisible = true">about</a>
      <a class="bold" href="https://github.com/anvaka/citations">source code</a>
    </div>
    <about v-if="aboutVisible" @close="aboutVisible = false"></about>

    <div class="welcome" v-if="!appState.hasQuery">
      <h3>Welcome!</h3>
      <p>
        This website renders most cited papers within a given keyword.
        <a
          class="highlight"
          href="#"
          @click.prevent="aboutVisible = true"
        >Click here</a> to learn more, or
        <a class="highlight" href="?query=computer%20science">try demo</a>.
      </p>
    </div>
  </div>
</template>

<script>

import appState, {performSearch} from "./appState.js";
import Typeahead from './components/Typeahead';
import Chart from './components/Chart';
import About from "./components/About";
import dataClient from './lib/dataClient.js';

export default {
  name: 'app',
  components: {
    Typeahead,
    Chart,
    About
  },
  data() {
    return {
      appState,
      aboutVisible: false
    };
  },
  computed: {
    isLoading() {
      return appState.progress.working;
    }
  },
  methods: {
    doSearch(q) {
      appState.query = q;
      this.onSubmit();
    },
    getSuggestions(input) {
      return dataClient.getSuggestion(input);
    },
    onSubmit() {
      if (!appState.query) return;

      performSearch(appState.query);
    },
  }
}
</script>

<style lang='stylus'>
@import ('./vars.styl');
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 8px;
}

a {
  text-decoration: none;
  &:hover, &:focus {
    color: highlight-color;
    border-bottom: 1px dashed;
  }
}
.help {
  font-size: 12px;
  margin-top: 8px;

  a {
    background: background-color;
  }
}
.search-box {
  position: relative;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), 0 -1px 0px rgba(0, 0, 0, 0.02);
  height: 48px;
  display: flex;
  font-size: 16px;
  padding: 0;
  cursor: text;
  width: 400px;

  span {
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }
}
.progress {
  margin-top: 8px;
}

.about-line {
  position: fixed;
  right: 0;
  top: 8px;
  padding: 0px 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  z-index: 4;

  a {
    text-align: right;
    background: background-color;
    font-size: 12px;
    padding: 0 8px;
    line-height: 24px;
    height: 24px;
    border-bottom: 1px solid transparent;

    &:hover, &:focus {
      color: highlight-color;
      border-bottom: 1px dashed;
    }
  }
}

@media (max-width: 800px) {
  .search-box  {
    width: 100%;
  }
  #app {
    width: 100%;
    margin: 0;
  }

  .chart {
    top: 75px;
    max-width: inherit;
    width: 100%;
  }

  .welcome {
    padding: 16px;
    position: absolute;
  }

  .help {
    padding: 0 8px;
  }

  .about-line {
    bottom: 0;
    top: initial;
    right: 0;
  }
}
@media (max-height: 550px) {
  .search-box {
    height: 32px;

    input.search-input {
      font-size: 16px;
    }
  }
  .chart {
    top: 60px;
  }

  .help {
    margin-top: 4px;
  }
}
</style>
