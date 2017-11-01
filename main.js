window.vPager = `
  <div id="vpager" class="pageing-blue" v-if="pageList>1" v-cloak>
    <template v-if="pageList<=8">
      <a href="javascript:;" track-by="$index" v-for="i in pageList" v-text="i+1" data-index="{{i+1}}" v-bind:class="i+1 == thispage ? 'blue' : ''" @click="toPage"></a>
    </template>
    <template v-if="pageList>8 && pageList<=16">
      <a href="javascript:;" track-by="$index" v-for="i in pageList" v-text="i+1" data-index="{{i+1}}"  v-bind:class="i+1 == thispage ? 'blue' : ''" v-if="thispage-i<5 && i-thispage<5" @click="toPage"></a>
    </template>
    <template v-if="pageList>16">
      <a href="javascript:;" track-by="$index" v-for="i in pageList" v-text="i+1" data-index="{{i+1}}"  v-bind:class="i+1 == thispage ? 'blue' : ''" v-if="thispage-i<5 && i-thispage<5" @click="toPage"></a>
      <span v-if="pageList!=thispage && pageList-thispage>5">...</span>
      <a v-if="pageList!=thispage && pageList-thispage>5" href="javascript:;" v-text="pageList" data-index="{{pageList}}"  @click="toPage"></a>
    </template>
    <input type="search" v-model="pagetxt">
    <button @click="gotoPage">跳转</button>
    <a href="javascript:;" class="blue" v-if="thispage!=1" data-index="{{thispage-1}}" @click="toPage">上一页</a>
    <a href="javascript:;" class="blue" v-if="thispage!=pageList" data-index="{{thispage+1}}" @click="toPage">下一页</a>
  </div>`
document.querySelector('o-pager').outerHTML = vPager
let vm = new Vue({
	el: '#body',
	data: {
		pageList: 20,
		pagetxt: '',
		thispage: 1,
		index: 1,
	},
	methods: {

		// 点击分页
		toPage(e) {
			const tar = e.target
			vm.thispage = tar.dataset.index
			vm.thispage =parseInt(vm.thispage, 10)
			console.log(vm.thispage)
			for(let i = 0, el = document.querySelectorAll('#vpager>a'); i < el.length; i++) {
				el[i].classList.remove('blue')
			}
			tar.classList.add('blue')
		},
		// 输入跳转分页
		gotoPage() {
			if(this.pagetxt > vm.pageList || this.pagetxt < 1) {
				alert(`当前数据仅有${vm.pageList}页，请输入有效页数`)
			} else {
				vm.thispage = this.pagetxt
			}
		},
	}
})
