"use strict";(self["webpackChunkec_site"]=self["webpackChunkec_site"]||[]).push([[947],{3650:(e,t,n)=>{var r=n(2109),d=n(1702),l=n(4488),s=n(9303),i=n(1340),a=d("".slice),c=Math.max,o=Math.min,u=!"".substr||"b"!=="ab".substr(-1);r({target:"String",proto:!0,forced:u},{substr:function(e,t){var n,r,d=i(l(this)),u=d.length,C=s(e);return C===1/0&&(C=0),C<0&&(C=c(u+C,0)),n=void 0===t?u:s(t),n<=0||n===1/0?"":(r=o(C+n,u),C>=r?"":a(d,C,r))}})},6502:(e,t,n)=>{n.r(t),n.d(t,{default:()=>qe});n(8309),n(2526),n(1817);var r=n(3396),d=n(7139),l=function(e){return(0,r.dD)("data-v-5ba375cf"),e=e(),(0,r.Cn)(),e},s={class:"payment-top"},i=l((function(){return(0,r._)("h1",{class:"page-title"},"支払い画面",-1)})),a={class:"contents-container"},c={class:"address-container"},o=l((function(){return(0,r._)("p",{class:"address-title"},"1 住所",-1)})),u=["onClick"],C={class:"address-text"},v=["onClick"],m=l((function(){return(0,r._)("div",{class:"cross"},null,-1)})),p={class:"payment-container"},y=l((function(){return(0,r._)("p",{class:"payment-title"},"2 お支払い方法",-1)})),f=["onClick"],b={class:"payment-info-contents"},h={class:"payment-info"},_={class:"payment-text"},M={class:"payment-content"},g={class:"button-container"},w={class:"cart-button-container"},k={key:0,class:"error-message"},A={key:3,class:"overlay"};function S(e,t,n,l,S,x){var P=(0,r.up)("AddressModal"),D=(0,r.up)("CreditModal");return(0,r.wg)(),(0,r.iD)("main",null,[(0,r._)("div",s,[i,(0,r._)("div",a,[(0,r._)("div",c,[o,((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(l.displayedAddresses,(function(e,t){return(0,r.wg)(),(0,r.iD)("div",{class:"address-select-container",key:t},[(0,r._)("div",{class:"outer-circle",onClick:function(e){return l.toggleAddressCircle(t)}},[(0,r._)("div",{class:(0,d.C_)(["inner-circle",{"inner-circle-selected":l.selectedAddressIndex===t&&l.selectedAddressCircle}])},null,2)],8,u),(0,r._)("div",C,(0,d.zw)(e.address),1),(0,r._)("button",{class:"delete-address-button",onClick:function(e){return l.deleteAddress(t)}}," 削除 ",8,v)])})),128)),(0,r._)("div",{class:"address-registration",onClick:t[0]||(t[0]=function(){return l.openAddressModal&&l.openAddressModal.apply(l,arguments)})},[m,(0,r.Uk)(" 新しい住所を登録 ")])]),(0,r._)("div",p,[y,((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(l.paymentMethods,(function(e,n){return(0,r.wg)(),(0,r.iD)("div",{class:"payment-info-container",key:n},[(0,r._)("div",{class:"outer-circle",onClick:function(e){return l.togglePaymentMethodCircle(n)}},[(0,r._)("div",{class:(0,d.C_)(["inner-circle",{"inner-circle-selected":l.selectedPaymentMethodIndex===n}])},null,2)],8,f),(0,r._)("div",b,[(0,r._)("div",h,[(0,r._)("p",_,(0,d.zw)(e.name),1),(0,r._)("p",M,(0,d.zw)(e.description),1)]),e.hasModalButton?((0,r.wg)(),(0,r.iD)("button",{key:0,class:"credit-modal-open",onClick:t[1]||(t[1]=function(){return l.openCreditModal&&l.openCreditModal.apply(l,arguments)})}," クレジットカードの変更 ")):(0,r.kq)("",!0)])])})),128))])]),(0,r._)("div",g,[(0,r._)("button",{class:"return-to-cart",onClick:t[2]||(t[2]=function(){return x.returnToCart&&x.returnToCart.apply(x,arguments)})}," ← カート一覧へ戻る "),(0,r._)("div",w,[(0,r._)("button",{class:"go-to-cart-check",onClick:t[3]||(t[3]=function(){return l.goToCartCheck&&l.goToCartCheck.apply(l,arguments)})}," ご注文確認へ進む → ")])]),l.errorMessage?((0,r.wg)(),(0,r.iD)("p",k,(0,d.zw)(l.errorMessage),1)):(0,r.kq)("",!0),l.isAddressModalVisible?((0,r.wg)(),(0,r.j4)(P,{key:1,onSubmitForm:t[4]||(t[4]=function(e){return l.submitForm(e)}),onCloseModal:l.closeModal},null,8,["onCloseModal"])):(0,r.kq)("",!0),l.isCreditModalVisible?((0,r.wg)(),(0,r.j4)(D,{key:2,onCloseModal:l.closeModal},null,8,["onCloseModal"])):(0,r.kq)("",!0),l.isAddressModalVisible||l.isCreditModalVisible?((0,r.wg)(),(0,r.iD)("div",A)):(0,r.kq)("",!0)])])}n(7042),n(2222),n(7658);var x=n(4870),P=n(5010),D=function(e){return(0,r.dD)("data-v-46be17d3"),e=e(),(0,r.Cn)(),e},I={class:"address-modal-container"},V={class:"address-modal"},H={class:"top-container"},q=D((function(){return(0,r._)("p",{class:"top-message"},"新しいお届け先を入力",-1)})),N={class:"post-code-input-container"},F=D((function(){return(0,r._)("p",{class:"post-code-title"},"郵便番号",-1)})),z={class:"prefecture-input-container"},U=D((function(){return(0,r._)("p",{class:"prefecture-title"},"都道府県",-1)})),T=["value"],Y={class:"city-input-container"},$=D((function(){return(0,r._)("p",{class:"city-title"},"市区町村",-1)})),K={class:"house-number-input-container"},B=D((function(){return(0,r._)("p",{class:"house-number-title"},"丁目・番地・号",-1)})),Z={class:"building-name-input-container"},j=D((function(){return(0,r._)("p",{class:"building-name-title"},"建物名/会社名・部屋番号",-1)})),E=D((function(){return(0,r._)("button",{class:"address-admit-button",type:"submit"}," この住所を登録 ",-1)})),J={key:0,class:"overlay"};function O(e,t,n,l,s,i){return(0,r.wg)(),(0,r.iD)("div",I,[(0,r._)("div",V,[(0,r._)("div",H,[q,(0,r._)("button",{class:"close-modal-button",onClick:t[0]||(t[0]=function(t){return e.$emit("close-modal")})}," × ")]),(0,r._)("form",{class:"address-input-container",onSubmit:t[6]||(t[6]=(0,P.iM)((function(){return i.submitForm&&i.submitForm.apply(i,arguments)}),["prevent"]))},[(0,r._)("div",N,[F,(0,r.wy)((0,r._)("input",{type:"text","onUpdate:modelValue":t[1]||(t[1]=function(e){return s.postCode=e}),class:"post-code-input",pattern:"\\d{7}",title:"半角数字7文字で入力してください",placeholder:"ハイフンなし",required:""},null,512),[[P.nr,s.postCode]])]),(0,r._)("div",z,[U,(0,r.wy)((0,r._)("select",{class:"prefecture-select",size:"1","onUpdate:modelValue":t[2]||(t[2]=function(e){return s.selectedPrefecture=e}),required:""},[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(s.prefectures,(function(e){return(0,r.wg)(),(0,r.iD)("option",{key:e,value:e,class:"prefecture-option"},(0,d.zw)(e),9,T)})),128))],512),[[P.bM,s.selectedPrefecture]])]),(0,r._)("div",Y,[$,(0,r.wy)((0,r._)("input",{type:"text","onUpdate:modelValue":t[3]||(t[3]=function(e){return s.city=e}),class:"city-input",placeholder:"〇〇市〇〇区〇〇町",required:""},null,512),[[P.nr,s.city]])]),(0,r._)("div",K,[B,(0,r.wy)((0,r._)("input",{type:"text","onUpdate:modelValue":t[4]||(t[4]=function(e){return s.houseNumber=e}),class:"house-number-input",placeholder:"1-2-3",required:""},null,512),[[P.nr,s.houseNumber]])]),(0,r._)("div",Z,[j,(0,r.wy)((0,r._)("input",{type:"text","onUpdate:modelValue":t[5]||(t[5]=function(e){return s.buildingName=e}),class:"building-name-input",placeholder:"〇〇マンション〇〇〇号室"},null,512),[[P.nr,s.buildingName]])]),E,s.isAddressModalVisible?((0,r.wg)(),(0,r.iD)("div",J)):(0,r.kq)("",!0)],32)])])}const G={data:function(){return{prefectures:["北海道","青森県","岩手県","宮城県","秋田県","山形県","福島県","茨城県","栃木県","群馬県","埼玉県","千葉県","東京都","神奈川県","新潟県","富山県","石川県","福井県","山梨県","長野県","岐阜県","静岡県","愛知県","三重県","滋賀県","京都府","大阪府","兵庫県","奈良県","和歌山県","鳥取県","島根県","岡山県","広島県","山口県","徳島県","香川県","愛媛県","高知県","福岡県","佐賀県","長崎県","熊本県","大分県","宮崎県","鹿児島県","沖縄県"],isAddressModalVisible:!1,postCode:"",selectedPrefecture:"",city:"",houseNumber:"",buildingName:""}},methods:{submitForm:function(){var e={postCode:this.postCode,selectedPrefecture:this.selectedPrefecture,city:this.city,houseNumber:this.houseNumber,buildingName:this.buildingName};this.$emit("submit-form",e),this.postCode="",this.selectedPrefecture="",this.city="",this.houseNumber="",this.buildingName=""},openAddressModal:function(){this.isAddressModalVisible=!0}}};var L=n(89);const Q=(0,L.Z)(G,[["render",O],["__scopeId","data-v-46be17d3"]]),R=Q;var W={class:"credit-modal-container"},X={class:"credit-modal"},ee={class:"top-container"},te=(0,r._)("h1",{class:"credit-modal-title"},"お客様のクレジットカード",-1),ne=["onClick"],re={class:"credit-info"},de={class:"credit-company"},le={class:"credit-last-number"},se={class:"credit-name"},ie={class:"credit-date"},ae=["onClick"],ce=(0,r._)("div",{class:"cross"},null,-1),oe={key:0,class:"add-credit-modal"},ue={class:"credit-number-container"},Ce=(0,r._)("div",{class:"credit-number"},"カード番号",-1),ve={class:"credit-name-container"},me=(0,r._)("div",{class:"credit-name-title"},"カード名義人",-1),pe={class:"credit-date-container"},ye=(0,r._)("div",{class:"credit-date-title"},"有効期限",-1),fe={class:"credit-date-select"},be=(0,r._)("option",{value:""},"月",-1),he=["value"],_e=(0,r._)("option",{value:""},"年",-1),Me=["value"],ge={class:"credit-security-container"},we=(0,r._)("div",{class:"credit-security-title"},"セキュリティコード",-1),ke={key:1,class:"overlay"};function Ae(e,t,n,l,s,i){return(0,r.wg)(),(0,r.iD)("div",W,[(0,r._)("div",X,[(0,r._)("div",ee,[te,(0,r._)("button",{class:"close-modal-button",onClick:t[0]||(t[0]=function(t){return e.$emit("close-modal")})}," × ")]),((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(l.displayedCreditCards,(function(e,t){return(0,r.wg)(),(0,r.iD)("div",{class:"credit-info-container",key:t},[(0,r._)("div",{class:"outer-circle",onClick:function(e){return l.toggleCreditCardCircle(t)}},[(0,r._)("div",{class:(0,d.C_)(["inner-circle",{"inner-circle-selected":l.selectedCreditCardIndex===t}])},null,2)],8,ne),(0,r._)("div",re,[(0,r._)("div",de,(0,d.zw)(e.company),1),(0,r._)("div",le," 末尾:"+(0,d.zw)(e.number.slice(-4)),1),(0,r._)("div",se,(0,d.zw)(e.name),1),(0,r._)("div",ie,(0,d.zw)(e.month)+"/"+(0,d.zw)(e.year),1)]),(0,r._)("button",{class:"delete-credit-card-button",onClick:function(e){return l.deleteCreditCard(t)}}," 削除 ",8,ae)])})),128)),(0,r._)("div",{class:"credit-registration",onClick:t[1]||(t[1]=function(){return l.openCreditAddModal&&l.openCreditAddModal.apply(l,arguments)})},[ce,(0,r.Uk)(" 新しいクレジットカードを追加 ")]),l.isCreditAddModalVisible?((0,r.wg)(),(0,r.iD)("div",oe,[(0,r._)("button",{class:"close-sub-modal-button",onClick:t[2]||(t[2]=function(){return l.closeCreditAddModal&&l.closeCreditAddModal.apply(l,arguments)})}," × "),(0,r._)("form",{class:"modal-contents",onSubmit:t[9]||(t[9]=(0,P.iM)((function(){return l.addCreditCard&&l.addCreditCard.apply(l,arguments)}),["prevent"]))},[(0,r._)("div",ue,[Ce,(0,r.wy)((0,r._)("input",{type:"text",class:"credit-number-input","onUpdate:modelValue":t[3]||(t[3]=function(e){return l.newCreditCard.number=e}),required:""},null,512),[[P.nr,l.newCreditCard.number]])]),(0,r._)("div",ve,[me,(0,r.wy)((0,r._)("input",{type:"text",class:"credit-name-input","onUpdate:modelValue":t[4]||(t[4]=function(e){return l.newCreditCard.name=e}),required:""},null,512),[[P.nr,l.newCreditCard.name]])]),(0,r._)("div",pe,[ye,(0,r._)("div",fe,[(0,r.wy)((0,r._)("select",{class:"credit-month-select","onUpdate:modelValue":t[5]||(t[5]=function(e){return l.newCreditCard.month=e}),required:""},[be,((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(i.months,(function(e){return(0,r.wg)(),(0,r.iD)("option",{value:e,key:e},(0,d.zw)(e),9,he)})),128))],512),[[P.bM,l.newCreditCard.month]]),(0,r.wy)((0,r._)("select",{class:"credit-year-select","onUpdate:modelValue":t[6]||(t[6]=function(e){return l.newCreditCard.year=e}),required:""},[_e,((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(i.years,(function(e){return(0,r.wg)(),(0,r.iD)("option",{value:e,key:e},(0,d.zw)(e),9,Me)})),128))],512),[[P.bM,l.newCreditCard.year]])])]),(0,r._)("div",ge,[we,(0,r.wy)((0,r._)("input",{type:"password",pattern:"\\d{3,4}",class:"credit-security-input","onUpdate:modelValue":t[7]||(t[7]=function(e){return l.newCreditCard.securityCode=e}),required:""},null,512),[[P.nr,l.newCreditCard.securityCode]])]),(0,r._)("button",{class:"credit-submit",type:"submit",onClick:t[8]||(t[8]=(0,P.iM)((function(){return l.addCreditCard&&l.addCreditCard.apply(l,arguments)}),["prevent"]))}," カード追加 ")],32)])):(0,r.kq)("",!0),l.isCreditModalVisible?((0,r.wg)(),(0,r.iD)("div",ke)):(0,r.kq)("",!0)])])}n(1038),n(8783),n(3710),n(4916),n(7601),n(3650),n(1058);var Se=n(1509);const xe={computed:{months:function(){return Array.from({length:12},(function(e,t){var n=t+1;return n<10?"0".concat(n):"".concat(n)}))},years:function(){var e=(new Date).getFullYear(),t=e+20;return Array.from({length:t-e+1},(function(t,n){return e+n}))}},setup:function(){var e=(0,Se.t)(),t=(0,x.iH)(e.selectedCreditCardIndex),n=(0,x.iH)(e.selectedPaymentMethodIndex),d=(0,x.iH)(e.selectedCreditCardCircle),l=(0,x.iH)(e.selectedPaymentMethodCircle),s=(0,r.Fl)((function(){return e.creditCards.slice(0,3)})),i=(0,r.Fl)((function(){return e.selectedCreditCard})),a=(0,x.iH)(!0),c=(0,x.iH)(!1),o=(0,x.iH)({number:"",name:"",month:"",year:"",securityCode:"",company:""}),u=function(n){void 0!==s.value[n]?(t.value=n,console.log("Selected credit card to set:",s.value[n]),d.value=!0,e.setSelectedCreditCard(s.value[n]),e.setSelectedCreditCardIndex(n),e.setSelectedCreditCardCircle(!0)):console.error("Invalid index:",n,"Credit Cards:",s.value)},C=function(t){n.value=t,l.value=!0,e.setSelectedPaymentMethodIndex(t),e.setSelectedPaymentMethodCircle(!0)},v=function(){c.value=!0},m=function(){c.value=!1},p=function(n){e.creditCards[n]===e.selectedCreditCard?(e.setSelectedCreditCard(null),e.setSelectedCreditCardIndex(null),e.setSelectedCreditCardCircle(!1)):e.selectedCreditCard&&null!==t.value&&n<t.value&&(t.value=t.value-1,e.setSelectedCreditCardIndex(t.value)),e.removeCreditCard(n)},y=function(){3===e.creditCards.length&&e.removeCreditCard(e.creditCards.length-1);var n=o.value.number,r=o.value.name,l=o.value.month,s=o.value.year,a=o.value.securityCode;if(/^\d+$/.test(n)){var u=n[0],C=n.substr(0,2),v=null,m=null;switch(u){case"4":v=16,m="Visa";break;case"5":v=16,m="MasterCard";break;default:switch(C){case"34":case"37":v=15,m="American Express";break;case"35":v=16,m="JCB";break;case"36":v=14,m="Diners Club";break;default:return void alert("無効なカード番号です")}}if(n.length===v)if(/^[A-Z\s]+$/.test(r))if(/^\d{3,4}$/.test(a))if(l&&s){var p=(new Date).getFullYear(),y=(new Date).getMonth()+1;if(parseInt(s)<p||parseInt(s)===p&&parseInt(l)<y)alert("有効期限が過去の日付です");else{var f={number:n,name:r,month:l,year:s,securityCode:a,company:m};e.addCreditCard(f),e.setSelectedCreditCard(null),i.value=null,t.value=null,d.value=!1,c.value=!1,o.value.number="",o.value.name="",o.value.month="",o.value.year="",o.value.securityCode="",o.value.company=""}}else alert("有効期限を選択してください");else alert("セキュリティコードは3桁または4桁の数字である必要があります");else alert("カード名義は半角大文字のローマ字のみで入力してください");else alert("カード番号は"+v+"桁である必要があります")}else alert("カード番号は半角数字のみ入力してください")};return{paymentStore:e,selectedCreditCardIndex:t,selectedPaymentMethodIndex:n,selectedCreditCardCircle:d,selectedCreditCard:i,selectedPaymentMethodCircle:l,displayedCreditCards:s,toggleCreditCardCircle:u,togglePaymentMethodCircle:C,openCreditAddModal:v,closeCreditAddModal:m,deleteCreditCard:p,addCreditCard:y,isCreditModalVisible:a,isCreditAddModalVisible:c,newCreditCard:o}}},Pe=(0,L.Z)(xe,[["render",Ae]]),De=Pe;var Ie=n(2483);const Ve={components:{AddressModal:R,CreditModal:De},setup:function(){(0,r.bv)((function(){window.scrollTo(0,0)}));var e=(0,Se.t)(),t=(0,Ie.tv)(),n=(0,x.iH)(e.selectedAddressIndex),d=(0,x.iH)(e.selectedPaymentMethodIndex),l=(0,x.iH)(e.selectedAddressCircle),s=(0,x.iH)(e.selectedPaymentMethodCircle),i=(0,r.Fl)((function(){return e.addresses.slice(0,3)})),a=(0,r.Fl)((function(){return e.selectedAddress})),c=(0,r.Fl)((function(){return e.selectedCreditCard})),o=e.selectedPaymentMethod,u=(0,x.iH)(""),C=(0,r.Fl)((function(){return[{name:"クレジットカード",description:c.value?"".concat(c.value.company,"  末尾:").concat(c.value.number.slice(-4),"  ").concat(c.value.name,"  ").concat(c.value.month,"/").concat(c.value.year):"カード情報が選択されていません",hasModalButton:!0},{name:"代金引換え",description:"国内配送のみ。代引手数料がかかります。",hasModalButton:!1},{name:"コンビニ・ATM・ネットバンキング・電子マネー支払い",description:"商品の発送は代金のお支払い後になるため、お届け予定日はお支払い確定後にご案内いたします。",hasModalButton:!1}]})),v=function(t){void 0!==i.value[t]?(n.value=t,console.log("Selected address to set:",i.value[t]),l.value=!0,e.setSelectedAddress(i.value[t]),e.setSelectedAddressIndex(t),e.setSelectedAddressCircle(!0)):console.error("Invalid index:",t,"Addresses:",i.value)},m=function(t){d.value=t,s.value=!0;var n=C.value[t];e.setSelectedPaymentMethod(n),e.setSelectedPaymentMethodIndex(t),e.setSelectedPaymentMethodCircle(!0)},p=function(){e.setSelectedAddress(null),e.setSelectedAddressIndex(null),e.setSelectedAddressCircle(!1),l.value=!1,_.value=!0},y=function(){M.value=!0,e.setSelectedPaymentMethod(null),e.setSelectedPaymentMethodIndex(null),e.setSelectedPaymentMethodCircle(!1),d.value=null,s.value=!1},f=function(){_.value=!1,M.value=!1},b=function(t){var r=e.addresses[t];a.value&&r.address===a.value.address?(e.setSelectedAddress(null),n.value=null,e.setSelectedAddressCircle(!1),l.value=!1):n.value>t&&(n.value--,e.setSelectedAddressIndex(n.value)),e.removeAddress(t)},h=function(t){var n={name:"New Option",isActive:!1,address:"".concat(t.postCode," ").concat(t.selectedPrefecture).concat(t.city).concat(t.houseNumber," ").concat(t.buildingName)};3===e.addresses.length&&e.removeAddress(e.addresses.length-1),e.addAddress(n),_.value=!1},_=(0,x.iH)(!1),M=(0,x.iH)(!1),g=function(){null===n.value?u.value="住所情報を選択してください。":null===d.value?u.value="支払い情報を選択してください。":"クレジットカード"===C.value[d.value].name&&"カード情報が選択されていません"===C.value[d.value].description?u.value="クレジットカード情報を選択してください。":(u.value="",t.push("/cart-check"))};return{paymentStore:e,selectedAddressIndex:n,selectedPaymentMethodIndex:d,selectedAddressCircle:l,selectedAddress:a,selectedPaymentMethodCircle:s,displayedAddresses:i,toggleAddressCircle:v,togglePaymentMethodCircle:m,openAddressModal:p,openCreditModal:y,closeModal:f,deleteAddress:b,submitForm:h,isAddressModalVisible:_,isCreditModalVisible:M,paymentMethods:C,selectedPaymentMethod:o,goToCartCheck:g,errorMessage:u}},methods:{returnToCart:function(){this.$router.push("/cart-list")}}},He=(0,L.Z)(Ve,[["render",S],["__scopeId","data-v-5ba375cf"]]),qe=He}}]);
//# sourceMappingURL=CartPayment.528df1a8.js.map