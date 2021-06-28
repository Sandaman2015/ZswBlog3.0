<template>
    <div>
        <remote-js src="http://pv.sohu.com/cityjson?ie=utf-8"></remote-js>
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

<style>

</style>