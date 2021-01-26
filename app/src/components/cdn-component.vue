<template>
    <div id="baseCDN">
        <!-- <remote-css href="https://cdn.bootcss.com/twitter-bootstrap/4.2.1/css/bootstrap-grid.min.css"></remote-css>
    <remote-css href="https://cdn.bootcss.com/twitter-bootstrap/4.2.1/css/bootstrap-reboot.css"></remote-css>
    <remote-css href="https://cdn.bootcss.com/twitter-bootstrap/4.2.1/css/bootstrap.css"></remote-css>
    <remote-js src="https://cdn.bootcss.com/twitter-bootstrap/4.2.1/js/bootstrap.bundle.js"></remote-js> -->
        <remote-js src="https://cdn.jsdelivr.net/gh/yremp/yremp-js@1.5/sakura.js"></remote-js>
        <remote-js src="https://cdn.jsdelivr.net/gh/stevenjoezhang/live2d-widget/autoload.js"></remote-js>
    </div>
</template>
<script>
    export default {
        components: {
            //  'remote-css': {
            //       render(createElement) {            
            //         return createElement('link', { attrs: { rel: 'stylesheet', href: this.href }});
            //       },
            //       props: {
            //       href: { type: String, required: true },
            //       },
            //   },
            'remote-js': {
                render(createElement) {
                    return createElement('script', {
                        attrs: {
                            type: 'text/javascript',
                            src: this.src
                        }
                    });
                },
                props: {
                    src: {
                        type: String,
                        required: true
                    },
                },
            },
        }
    };
</script>

<style scoped>
</style>