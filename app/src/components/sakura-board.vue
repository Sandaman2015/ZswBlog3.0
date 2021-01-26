<template>
    <div>
        <remote-js src="https://cdn.jsdelivr.net/gh/yremp/yremp-js@1.5/sakura.js"></remote-js>
    </div>
</template>
<script>
    export default {
        components: {
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