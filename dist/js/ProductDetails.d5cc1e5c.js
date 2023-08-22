"use strict";(self["webpackChunkec_site"]=self["webpackChunkec_site"]||[]).push([[701],{5831:(t,e,c)=>{c.d(e,{g:()=>a});var r=c(5082),i=c(8668),a=(0,i.Q_)("merchandise",{state:function(){return{selectedProduct:{product_id:null,quantity:0,stock:0}}},actions:{selectProduct:function(t){this.selectedProduct=(0,r.Z)((0,r.Z)({},t),{},{quantity:t.stock})}}})},7942:(t,e,c)=>{c.r(e),c.d(e,{default:()=>B});var r=c(3396),i=c(7139),a=c(5010),o=c(1559),s={id:"productDetails",class:"product-details"},d={key:0,class:"product-details-warp"},u=(0,r._)("div",{class:"img-warp"},[(0,r._)("div",{class:"img"},[(0,r._)("img",{src:o,alt:"ProductImage",class:"productDetails-image"})])],-1),n={class:"explanatory-text-warp"},l={class:"explanatory-text"},p={class:"product-tittle"},v={class:"product-price"},f={class:"select-warp"},_={class:"size-warp"},g=(0,r._)("p",{class:"select-text"},"サイズ",-1),w={class:"dropdown-option"},P={class:"favorite-wrap"},m={class:"stock-warp"},k=(0,r._)("p",{class:"select-text"},"数量 ",-1),b={class:"favorite"},y={class:"favorite-border"},h={class:"button-warp"},Q={key:0,class:"error-message"},C={class:"modal"},x={class:"modal-content"},D={key:0,class:"modal-content-text"},M={key:1,class:"modal-content-text"};function Z(t,e,c,o,Z,F){return(0,r.wg)(),(0,r.iD)("div",s,[o.selectedProduct?((0,r.wg)(),(0,r.iD)("div",d,[u,(0,r._)("div",n,[(0,r._)("div",l,[(0,r._)("p",p,(0,i.zw)(o.selectedProduct.product_name),1),(0,r._)("div",v," ¥"+(0,i.zw)(F.computedProduct.price)+"(税込) ",1)]),(0,r._)("div",f,[(0,r._)("div",_,[g,(0,r._)("select",w,[(0,r._)("option",null,(0,i.zw)(o.selectedProduct.size),1)])]),(0,r._)("div",P,[(0,r._)("div",m,[k,(0,r.wy)((0,r._)("select",{class:"stock-dropdown-option","onUpdate:modelValue":e[0]||(e[0]=function(t){return o.selectedQuantities[o.selectedProduct.product_id]=t})},[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(o.availableQuantity(o.selectedProduct),(function(t){return(0,r.wg)(),(0,r.iD)("option",{key:t},(0,i.zw)(t),1)})),128))],512),[[a.bM,o.selectedQuantities[o.selectedProduct.product_id]]])]),(0,r._)("div",b,[(0,r._)("div",y,[(0,r._)("button",{class:(0,i.C_)(["heart",{"favorite pink":o.isFavorite},{favorite:!o.isFavorite},"favorite-button"]),onClick:e[1]||(e[1]=function(t){return o.toggleFavorite(o.selectedProduct,o.favoriteQuantities[o.selectedProduct.product_id])})},null,2)])])])]),(0,r._)("div",h,[(0,r._)("button",{id:"add-to-cart",onClick:e[2]||(e[2]=function(t){return o.addToCart(o.selectedProduct,o.selectedQuantities[o.selectedProduct.product_id])}),class:"cart-button"}," カートに追加 "),o.isLoginErrorVisible?((0,r.wg)(),(0,r.iD)("div",Q," ログインしてください。 ")):(0,r.kq)("",!0)])])])):(0,r.kq)("",!0),(0,r.wy)((0,r._)("div",C,[(0,r._)("div",x,[(0,r._)("span",{class:"close",onClick:e[3]||(e[3]=function(){return o.closeModal&&o.closeModal.apply(o,arguments)})},"×"),o.addToCartErrorMessage?((0,r.wg)(),(0,r.iD)("p",D,(0,i.zw)(o.addToCartErrorMessage),1)):((0,r.wg)(),(0,r.iD)("p",M,"商品をカートに追加しました。")),(0,r._)("button",{class:"modal-content-cart",onClick:e[4]||(e[4]=function(){return o.cartPage&&o.cartPage.apply(o,arguments)})}," カート画面へ ")])],512),[[a.F8,o.isModalVisible]])])}var F=c(5082),z=c(9584),H=c(124),T=c(8534),q=(c(9826),c(1539),c(1038),c(8783),c(7658),c(561),c(2222),c(6699),c(5831)),E=c(4870),V=c(2483),L=c(2474),Y=c(6632),j=c(7575),A=c(2094);const I={name:"productDetails",data:function(){return{}},setup:function(){var t=(0,L.x)(),e=(0,q.g)(),c=(0,Y.E)(),i=(0,j.a)(),a=(0,V.tv)(),o=(0,A.L)(),s=(0,E.iH)(!1),d=(0,E.qj)([]),u=(0,E.iH)({}),n=(0,E.iH)(1),l=(0,E.iH)(!1),p=(0,E.iH)(!1),v=(0,E.iH)(""),f=e.selectedProduct;function _(e,c){if(o.userId){var r=e.product_id,i=g(e);if(r){if(i<=0)return v.value="商品の在庫がありません",void(l.value=!0);t.addToCart(r,c),u.value[r]=1,l.value=!0}}else s.value=!0}function g(e){if(!f)return[];var c=t.cart.find((function(t){return t.product_id===e.product_id})),r=c?c.selectedQuantity:0;return Array.from({length:e.stock-r},(function(t,e){return e+1}))}function w(){l.value=!1,a.push("/product")}function P(){a.push("/cart-list")}function m(t,e){p.value?c.removeFavoriteQuantities(t):c.setFavoriteQuantities(t,e),p.value=!p.value}return(0,r.bv)((0,T.Z)((0,H.Z)().mark((function t(){return(0,H.Z)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return window.scrollTo(0,0),t.next=3,i.fetchProducts();case 3:u.value[e.selectedProduct.product_id];case 4:case"end":return t.stop()}}),t)})))),(0,r.YP)(e.selectedProduct,(function(t){d.splice.apply(d,[0,d.length].concat((0,z.Z)(Array.from({length:t.quantity},(function(t,e){return e+1})))))})),(0,r.YP)((function(){return c.favoriteQuantities}),(function(t){var c=e.selectedProduct.product_id;p.value=!!t.find((function(t){return t.product_id===c}))}),{immediate:!0}),{selectedProduct:e.selectedProduct,productQuantities:d,selectedQuantities:u,favoriteQuantities:n,availableQuantity:g,isModalVisible:l,addToCart:_,closeModal:w,toggleFavorite:m,cartPage:P,isFavorite:p,isLoginErrorVisible:s,addToCartErrorMessage:v}},computed:{computedProduct:function(){var t=this.selectedProduct;return t?["0034","0042","0049","0052"].includes(t.product_id)?(0,F.Z)((0,F.Z)({},t),{},{price:t.special_price}):t:null}}};var K=c(89);const U=(0,K.Z)(I,[["render",Z]]),B=U},1559:(t,e,c)=>{t.exports=c.p+"img/product_sample.6be93bb0.jpg"}}]);
//# sourceMappingURL=ProductDetails.d5cc1e5c.js.map