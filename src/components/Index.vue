<template>
<div class="main">
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a class="navbar-item" href="https://bulma.io">
                <img id="logo" src="../assets/restro-logo.jpg" alt="Restro"
                        width="120" height="40">
            </a>
        </div>
    </nav>

    <div class="content tile is-ancestor">
        <div class="tile is-8 gmap-container is-parent">
            <gmap-map :center="center" :zoom="11" map-type-id="roadmap" style="flex: 1 0 auto">
                <gmap-marker v-for="t in terminals" :position="t.geoloc" :clickable="true"
                        @click="makeActive(t)">
                </gmap-marker>
            </gmap-map>
        </div>

        <div class="tile is-4 detail-pane is-vertical is-parent">
            <div class="detail-header">
                <b-notification class="is-info" :closable="false">
                    <p>Recycle Terminal {{activeTerm.id}}</p>
                </b-notification>
            </div>
            <div class="detail-body">
                <b-loading :is-full-page="false" :active="isLoadingActiveTerm"></b-loading>
                <div class="list-placeholder" v-if="Object.keys(activeTerm).length === 0">
                    Click on any recycle terimals to begin.
                </div>
                <binitem-card v-for="item in activeTerm.inventory" :itemId="item.id"
                        :predictedType="item.prediction" :confirmed="item.confirmed === 1"
                        :imageBase64="item.image">
                </binitem-card>
            </div>
        </div>
    </div>

</div>
</template>

<script>
import configs from '../config';
import BinitemCard from './BinitemCard';

export default {
    name       : 'Index',
    components : {
        BinitemCard
    },
    props      : {
        msg : String
    },
    data() {
        return {
            center              : { lat : 1.359, lng : 103.818 },
            // pre-polutate due to slow server-response
            terminals           : [
                { "geoloc" : { "lng" : 103.870539, "lat" : 1.334283 }, "id" : 1 }, {
                    "id"     : 2,
                    "geoloc" : {
                        "lng" : 103.870539,
                        "lat" : 1.344283
                    }
                }, { "geoloc" : { "lng" : 103.870539, "lat" : 1.354283 }, "id" : 3 }],
            activeTerm          : {},
            isLoadingActiveTerm : false,
        }
    },
    methods    : {
        async makeActive(terminal) {
            this.isLoadingActiveTerm = true;
            const url                = `/terminal/${terminal.id}`;
            try {
                const res                = await this.$http.get(url);
                this.isLoadingActiveTerm = false;
                this.activeTerm          = res.data;
                this.center              = this.activeTerm.geoloc;
            } catch {
                this.activeTerm = {};
            }

        },
    },
    async created() {
        const url      = `/terminals`;
        const res      = await this.$http.get(url);
        this.terminals = res.data;
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

nav.navbar {
    background-color: #79c90d;
    color:            white;
}

div.main {
    min-height:     100vh;
    width:          100vw;
    display:        flex;
    flex-direction: column;
}

div.content {
    flex:          1 0 auto;
    margin:        0 !important;
    padding-right: 0.5em
}

div.gmap-container {
    display:    flex;
    min-height: 70vh;
}

.detail-header {
    height: 5em;
}

.detail-body {
    position:   relative;
    height:     calc(100vh - 156px);
    overflow-y: auto;
}

.list-placeholder {
    text-align: center;
}
</style>
