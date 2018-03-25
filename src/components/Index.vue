<template>
<div class="main">
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a class="navbar-item" href="https://bulma.io">
                <img src="https://i.pinimg.com/originals/07/93/a0/0793a045622b504943b975dd36c41da6.png" alt="Restro"
                        width="40" height="40">
            </a>

            <div class="navbar-burger">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </nav>

    <div class="content tile is-ancestor">
        <div class="tile is-8 gmap-container">
            <gmap-map :center="center" :zoom="11" map-type-id="roadmap" style="flex: 1 0 auto">
                <gmap-marker v-for="t in terminals" :position="t.geoloc" :clickable="true"
                        @click="makeActive(t)">
                </gmap-marker>
            </gmap-map>
        </div>

        <div class="tile is-4 detail-pane is-vertical is-parent" v-if="Object.keys(activeTerm).length !== 0">
            <div class="detail-header">
                <b-notification class="is-info" :closable="false">
                    <p>Recycle bin {{activeTerm.id}}</p>
                </b-notification>
            </div>
            <div class="detail-body">
                <binitem-card v-for="(item, itemId) in activeTerm.inventory" :itemId="itemId"
                        :predictedType="item.prediction" :confirmed="item.confirmed">
                </binitem-card>
            </div>
        </div>
    </div>

</div>
</template>

<script>
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
            center     : { lat : 1.359, lng : 103.818 },
            terminals  : [
                {
                    id        : 1,
                    inventory : [
                        {
                            "count" : 2,
                            "type"  : "bulb"
                        },
                        {
                            "count" : 3,
                            "type"  : "battery"
                        },
                        {
                            "count" : 1,
                            "type"  : "plastic-bottle"
                        }
                    ],
                    geoloc    : { lat : 1.334283, lng : 103.870539 }
                }, {
                    id        : 1,
                    inventory : [
                        {
                            "count" : 5,
                            "type"  : "bulb"
                        },
                        {
                            "count" : 2,
                            "type"  : "battery"
                        },
                        {
                            "count" : 3,
                            "type"  : "plastic-bottle"
                        }
                    ],
                    geoloc    : { lat : 1.316028, lng : 103.830556 }
                }],
            activeTerm : {},
        }
    },
    methods    : {
        async makeActive(terminal) {
            const url = `localhost/terminal/${terminal.id}`;
            let term = {};
            try {
                term = await this.$http.get(url);
            } finally {
                this.activeTerm = Object.assign({
                    id        : 21312,
                    inventory : {
                        123412 : {
                            prediction  : 'bottle',
                            confirmed   : true,
                            imageBase64 : ''
                        }
                    },
                    geoloc    : {
                        lat : 1.334283,
                        lng : 103.870539,
                    }
                }, term);
                this.center     = this.activeTerm.geoloc;
            }

        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
}
</style>
