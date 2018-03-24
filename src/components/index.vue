<template>
<div class="main">
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a class="navbar-item" href="https://bulma.io">
                <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox"
                        width="112" height="28">
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
                <gmap-marker :key="index" v-for="(m, index) in markers" :position="m.position" :clickable="true"
                        @click="center=m.position">
                </gmap-marker>
            </gmap-map>
        </div>

        <div class="tile is-4 detail-pane">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam semper diam at erat pulvinar, at
            pulvinar felis blandit. Vestibulum volutpat tellus diam, consequat gravida libero rhoncus ut.
            Morbi maximus, leo sit amet vehicula eleifend, nunc dui porta orci, quis semper odio felis ut
            quam.
        </div>
    </div>

</div>
</template>

<script>
export default {
    name  : 'Home Page',
    props : {
        msg : String
    },
    data() {
        return {
            center  : { lat : 1.359, lng : 103.818 },
            markers : [
                {
                    position : { lat : 1.334283, lng : 103.870539 }
                }, {
                    position : { lat : 1.316028, lng : 103.830556 }
                }]
        }
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
    flex: 1 0 auto;
    margin: 0!important;
}

div.gmap-container {
    display: flex;
    min-height: 70vh;
}
</style>
