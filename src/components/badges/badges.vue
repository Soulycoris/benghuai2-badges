<template>
  <div class="badges">
    <Row>
      <Col span="6" v-show="leftCol">
      <Card>
        <p slot="title">
          <Button type="text" icon="arrow-left-c" class="pull-right" v-show="leftCol" @click="leftCol = false"></Button>
          <Button type="text" icon="ios-cloud-download-outline" class="pull-right" @click="download"></Button>
        </p>
        <p>玩家信息
          <Icon type="arrow-down-b" class="info-arrow" @click.native="cardShow($event.target,'playInfo')"></Icon>
        </p>
        <hr>
        <div class="player-info" v-show="playInfo">
          <p>玩家名</p>
          <Input v-model="playerName" :maxlength="8" placeholder="请输入..."></Input>
          <p>玩家等级</p>
          <Input v-model="level" :maxlength="3" placeholder="请输入..."></Input>
          <p>节操数</p>
          <Input v-model="physicalStrength" placeholder="请输入..."></Input>
          <p>节操条显示</p>
          <i-switch v-model="barValue">
            <span slot="open">开</span>
            <span slot="close">关</span>
          </i-switch>
          <p>水晶数</p>
          <Input v-model="crystal" placeholder="请输入..."></Input>
          <p>金钱数</p>
          <Input v-model="money" placeholder="请输入..."></Input>
        </div>
        <p style="margin-top: 10px;">徽章信息
          <Icon type="arrow-down-b" class="info-arrow" @click.native="cardShow($event.target,'badgesInfo')"></Icon>
        </p>
        <hr>
        <div v-show="badgesInfo">
          <p>徽章名</p>
          <Input v-model="badgesName" placeholder="请输入..." :maxlength="12"></Input>
          <p>神系</p>
          <Select v-model="godFamily" filterable @on-change="godFamilyChange" class="badges-god-family-list">
            <Option v-for="item in godFamilyLists" :value="item.value" :key="item.value" :label="item.label">
              <!-- <img :src="`/static/badges/god family/${item.value}.png`" alt=""> -->
              <img v-lazy="`/static/badges/god_family/${item.value}.png`"> {{ item.label }}
            </Option>
          </Select>
          <p>编号</p>
          <Input v-model="badgesIdentifier" placeholder="请输入..." :maxlength="5"></Input>
          <p>当前星级 - 总星级</p>
          <Select v-model="badgesLevel" filterable style="width:145px;">
            <Option v-for="item in ['5','6','7','8']" :value="item" :key="item">{{ item }}</Option>
          </Select>
          -
          <Select v-model="badgesLevelTotal" filterable style="width:145px;">
            <Option v-for="item in ['6','7','8']" :value="item" :key="item">{{ item }}</Option>
          </Select>
          <p>技能1名字</p>
          <Input v-model="skill_01_name" placeholder="请输入..." :maxlength="5"></Input>
          <p>技能1描述</p>
          <Input v-model="skill_01_info" type="textarea" :autosize="true" placeholder="请输入..."></Input>
          <p>技能2</p>
          <i-switch v-model="skill_02">
            <span slot="open">开</span>
            <span slot="close">关</span>
          </i-switch>
          <div v-show="skill_02">
            <p>技能2名字</p>
            <Input v-model="skill_02_name" placeholder="请输入..." :maxlength="5"></Input>
            <p>技能2描述</p>
            <Input v-model="skill_02_info" type="textarea" :autosize="true" placeholder="请输入..."></Input>
          </div>
          <p>追加等级99</p>
          <i-switch v-model="addLevel">
            <span slot="open">开</span>
            <span slot="close">关</span>
          </i-switch>
          <p>锁定装备</p>
          <i-switch v-model="unprotect">
            <span slot="open">开</span>
            <span slot="close">关</span>
          </i-switch>
          <p>装备简介</p>
          <Input v-model="equipment_info" type="textarea" :autosize="true" placeholder="请输入..."></Input>
          <p>装备负重</p>
          <Input v-model="weight" placeholder="请输入..."></Input>
          <p>装备图标
            <Icon type="arrow-down-b" class="info-arrow" @click.native="cardShow($event.target,'iconInfo')"></Icon>
          </p>
          <hr>
          <div class="badges-icon-list" v-show="iconInfo">
            <span v-for="item in equipmentIconLists" @click="iconChange(item)"><img v-lazy="`/static/badges/icon/${item}`"></span>
          </div>
          <p>手动图标 - 宽高模式</p>
          <i-switch v-model="manualIcon">
            <span slot="open">开</span>
            <span slot="close">关</span>
          </i-switch>
          <i-switch v-model="haw">
            <span slot="open">宽</span>
            <span slot="close">高</span>
          </i-switch>
          <div v-show="manualIcon">
            <Upload action="/action" accept="image/*" :before-upload="imgToBase64">
              <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
            </Upload>
            <p>位置调整</p>
            <Button type="text" icon="arrow-up-a" @click="manualPosition('up')"></Button>
            <Button type="text" icon="arrow-down-a" @click="manualPosition('down')"></Button>
            <Button type="text" icon="arrow-left-a" @click="manualPosition('left')"></Button>
            <Button type="text" icon="arrow-right-a" @click="manualPosition('right')"></Button>
          </div>
        </div>
      </Card>
      </Col>
      <Col span="18">
      <Button type="text" icon="navicon-round" v-show="!leftCol" @click="leftCol = true"></Button>
      <Card dis-hover>
        <div class="badges-body" ref="badges">
          <div class="badges-main"></div>
          <div class="player-name">{{ playerName }}</div>
          <div class="level">{{ level }}</div>
          <div class="physical-strength">{{ physicalStrength }}</div>
          <div class="physical-value-bar" v-show="barValue"></div>
          <div class="crystal">{{ crystal }}</div>
          <div class="money">{{ money }}</div>
          <div class="badges-name">{{ badgesName }}</div>
          <div class="badges-god-family"><img :src="godFamilyImg" alt=""></div>
          <div class="badges-identifier">{{ badgesIdentifier }}</div>
          <div class="badges-total-level" :style="{ width : (badgesLevelTotal-5)*38 + 'px'}"></div>
          <div class="badges-current-level" :style="{ width : (badgesLevel-5)*38 + 'px'}"></div>
          <div class="skill-name skill-1-name">{{ skill_01_name }}</div>
          <div class="skill-info skill-1-info">{{ skill_01_info }}</div>
          <div class="skill-2-bg" v-show="skill_02"></div>
          <div class="skill-name skill-2-name" v-show="skill_02">{{ skill_02_name }}</div>
          <div class="skill-info skill-2-info" v-show="skill_02">{{ skill_02_info }}</div>
          <div class="badges-icon" ref="badgesIcon" v-show="!manualIcon"></div>
          <div class="additional-add"></div>
          <div class="additional-grade" v-show="addLevel"></div>
          <div class="additional-grade-99-additional" v-show="addLevel"></div>
          <div class="only-equipment">{{ equipment_info }}</div>
          <div class="unprotect" v-show="unprotect"></div>
          <div class="weight">{{ weight }}</div>
          <div class="badges-icon-manual" ref="badgesIconManual" v-show="manualIcon"></div>
        </div>
      </Card>
      </Col>
      <Modal v-model="badgesShow" title="徽章详情" width="900" :styles="{top: '20px'}">
        <img v-lazy="badgesShowSrc" alt="" class="badges-show">
        <div slot="footer">
          <a :href="badgesShowSrc" target="_black" download="badges.png">下载</a>
        </div>
      </Modal>
    </Row>
  </div>
</template>
<script>
import snabbt from "snabbt.js";
import html2canvas from "html2canvas";
import {
  allGodFamily,
  allBagesIcon
} from "./badgesData.js";
export default {
  name: 'badges',
  data() {
    return {
      msg: 'Welcome to badges',
      leftCol: true,
      playInfo: false,
      badgesInfo: false,
      iconInfo: false,
      level: '0',
      playerName: '嘿嘿嘿',
      crystal: '0',
      money: '0',
      physicalStrength: '0/0',
      barValue: false,
      badgesName: '流云盘龙珮',
      godFamily: 'Series28',
      godFamilyImg: '/static/badges/god family/Series28.png',
      godFamilyLists: allGodFamily,
      badgesIdentifier: '1214',
      badgesLevel: '6',
      badgesLevelCurrent: '6',
      badgesLevelTotal: '6',
      skill_01_name: '和谐',
      skill_01_info: '装备3种不同系列的装备时，回避率提升50%。',
      skill_02: false,
      skill_02_name: '不和谐',
      skill_02_info: '装备3种同系列的装备时，暴击率提升50%。',
      addLevel: false,
      equipment_info: '唯一装备，带多件无效哟~',
      unprotect: false,
      weight: '20',
      equipmentIcon: '',
      equipmentIconImg: '/static/badges/god family/Series28.png',
      equipmentIconLists: allBagesIcon,
      equipmentIconModal: false,
      manualIcon: false,
      badgesShow: false,
      badgesShowSrc: '',
      haw: false,
      manualClassObj: {
        positionA: 'center',
        positionJ: 0,
        sizeW: 100,
        sizeH: 'auto',
      }
    }
  },
  created() {
    // console.log(allGodFamily);
  },
  filters: {
    info(e) {
      let r = /{/;
      let l = /}/;
      e = e.replace(r, '<b>').replace(l, '</b>');
      // e;
      console.log(e);
      return e;
    }
  },
  watch: {
    haw() {
      if (this.haw) {
        this.$refs.badgesIconManual.style.backgroundSize = `100% auto`;
      } else {
        this.$refs.badgesIconManual.style.backgroundSize = `auto 100%`;
      }
    },
    badgesLevel() {
      if (this.badgesLevel > this.badgesLevelTotal) {
        this.badgesLevelTotal = this.badgesLevel;
      }
    }
  },
  methods: {
    cardShow(element, card) {
      // console.log(e);
      this[card] = !this[card];
      if (this[card]) {
        snabbt(element, {
          rotation: [0, 0, 0],
          duration: 200,
        });
      } else {
        snabbt(element, {
          rotation: [0, Math.PI, -Math.PI],
          duration: 200,
        });
      }
    },
    godFamilyChange(select) {
      // console.log(select);
      this.godFamilyImg = `/static/badges/god_family/${select}.png`;
    },
    download() {
      let _this = this;
      this.badgesShow = true;
      html2canvas(this.$refs.badges).then((canvas) => {
        _this.badgesShowSrc = canvas.toDataURL();
      });
    },
    iconChange(item) {
      console.log()
      this.$refs.badgesIcon.style.backgroundImage = `url(/static/badges/icon/${item})`;
      //
    },
    imgToBase64(img) {
      let _this = this;
      let reader = new FileReader();
      reader.addEventListener("load", function() {
        // console.log(this === _this)
        _this.imgsrc = reader.result;
        // _this.imgToStr(_this.imgsrc.replace(/data:image.*base64,?/, ''));
        _this.$refs.badgesIconManual.style.backgroundImage = `url(${reader.result})`;
      }, false);
      reader.readAsDataURL(img);
      return false;
    },
    manualPosition(e) {
      // console.log(this.$refs.badgesIconManual.style.backgroundSize)
      this.haw = true;
      switch (e) {
        case 'up':
          this.manualClassObj.positionJ -= 1;
          this.$refs.badgesIconManual.style.backgroundPositionY = `${this.manualClassObj.positionJ}%`
          break;
        case 'down':
          this.manualClassObj.positionJ += 1;
          this.$refs.badgesIconManual.style.backgroundPositionY = `${this.manualClassObj.positionJ}%`
          break;
        case 'left':
          this.manualClassObj.sizeW -= 1;
          this.$refs.badgesIconManual.style.backgroundSize = `${this.manualClassObj.sizeW}% auto`
          break;
        case 'right':
          this.manualClassObj.sizeW += 1;
          this.$refs.badgesIconManual.style.backgroundSize = `${this.manualClassObj.sizeW}% auto`
          break;
      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@font-face {
  font-family: msyhbd-Bold;
  src: url("/static/font/msyhbd-Bold.ttf");
}

.badges {
  hr {
    color: #eee;
  }
  // font-family: msyhbd-Bold;
  // font-size: 3.2em;
  user-select: none;
  transition: all .8s linear;
  .pull-right {
    float: right !important;
  }
  b {
    color: #2c9ed2;
  }
  img {
    width: 100%;
    height: auto;
  }
  .info-arrow {
    float: right;
    margin-top: 5px;
    transition: color .2s linear, background-color .2s linear, border .2s linear;
    &:hover {
      color: #5cadff;
    }
  }
  .badges-god-family-list {
    li {
      line-height: 21px;
    }
    img {
      width: 20px;
      height: auto;
      float: left;
      margin-right: 5px;
    }
  }
  .badges-icon-list {
    width: 100%;
    height: 256px;
    overflow: scroll;
  }
  .badges-body {
    font-family: msyhbd-Bold;
    width: 1277px;
    height: 720px;
    position: relative;
    color: #f7f7f7;
    overflow: hidden;
    .badges-main {
      background-image: url("/static/badges/badges.png");
      position: absolute;
      left: 0px;
      top: 0px;
      width: 1277px;
      height: 720px;
      z-index: 3;
    }
    .player-name {
      // background-image: url("/static/badges/player name.png");
      position: absolute;
      left: 147px;
      top: 16px;
      width: 185px;
      height: 24px;
      z-index: 21;
      font-size: 23px;
      line-height: 24px;
      text-align: center;
    }
    .crystal {
      // background-image: url("/static/badges/crystal.png");
      position: absolute;
      left: 263px;
      top: 80px;
      width: 42px;
      height: 14px;
      z-index: 25;
      font-size: 16px;
      line-height: 12px;
      letter-spacing: 0.5px;
    }
    .money {
      // background-image: url("/static/badges/money.png");
      position: absolute;
      left: 131px;
      top: 80px;
      width: 75px;
      height: 14px;
      z-index: 24;
      font-size: 16px;
      line-height: 12px;
      letter-spacing: 0.5px;
      // text-align: center;
    }
    .physical-strength {
      // background-image: url("/static/badges/physical strength.png");
      position: absolute;
      left: 221px;
      top: 48px;
      width: 72px;
      height: 16px;
      z-index: 20;
      font-size: 16px;
      line-height: 14px;
      text-align: center;
    }
    .physical-value-bar {
      background-image: url("/static/badges/physical value bar.png");
      position: absolute;
      left: 152px;
      top: 42px;
      width: 242px;
      height: 25px;
      z-index: 19;
      background-repeat: no-repeat;
    }
    .badges-name {
      // background-image: url("/static/badges/badges name.png");
      position: absolute;
      left: 404px;
      top: 131px;
      width: 360px;
      height: 32px;
      z-index: 26;
      color: #7e7e7e;
      font-size: 30px;
      line-height: 28.5px;
      text-shadow: #C2C2C280 1px 0 0, #C2C2C280 0 1px 0, #C2C2C280 -1px 0 0, #C2C2C280 0 -1px 0;
    }
    .badges-god-family {
      // background-image: url("/static/badges/all god family.png");
      position: absolute;
      left: 349px;
      top: 122px;
      width: 48px;
      height: 48px;
      z-index: 18;
    }
    .badges-identifier {
      // background-image: url("/static/badges/badges-identifier.png");
      position: absolute;
      left: 227px;
      top: 136px;
      width: 68px;
      height: 22px;
      z-index: 4;
      font-size: 26px;
      line-height: 20px;
      text-align: center;
    }
    .badges-current-level {
      background-image: url("/static/badges/bright star.png");
      position: absolute;
      left: 968px;
      top: 127px;
      width: 76px;
      height: 38px;
      z-index: 3;
      background-position: 0px 0px;
      // background-size:0px  ;
    }
    .badges-total-level {
      background-image: url("/static/badges/gray star.png");
      position: absolute;
      left: 968px;
      top: 127px;
      width: 76px;
      height: 38px;
      z-index: 3;
    }
    .skill-name{
      width: 450px;
      height: 30px;
      z-index: 3;
      color: #FC990F;
      font-size: 30px;
      line-height: 24px;
    }
    .skill-info{

      width: 422px;
      height: 91px;
      z-index: 22;
      color: #7A7C7B;
      font-size: 24px;
      line-height: 33px;
    }
    .skill-1-name {
      // background-image: url("/static/badges/skill_1_name.png");
      position: absolute;
      left: 739px;
      top: 406px;
    }
    .skill-1-info {
      // background-image: url("/static/badges/skill_1_info.png");
      position: absolute;
      left: 739px;
      top: 450px;
    }
    .skill-1-break {
      position: absolute;
      left: 960px;
      top: 406px;
      width: 440px;
      height: 215px;
      z-index: 2;
    }
    .skill-2-bg {
      background-image: url("/static/badges/skill_2_bg.png");
      position: absolute;
      left: 723px;
      top: 582px;
      width: 472px;
      height: 2px;
      z-index: 3;
    }
    .skill-2-name {
      // background-image: url("skill-2-name.png");
      position: absolute;
      left: 740px;
      top: 548px;
    }
    .skill-2-info {
      // background-image: url("/static/badges/skill_1_info.png");
      position: absolute;
      left: 739px;
      top: 591px;
    }
    .skill-2-break {
      position: absolute;
      left: 960px;
      top: 547px;
      width: 440px;
      height: 215px;
      z-index: 3;
    }
    .badges-icon {
      background-image: url("/static/badges/badges_icon.png");
      position: absolute;
      left: 193px;
      top: 322px;
      width: 345px;
      height: 144px;
      z-index: 15;
      background-repeat: no-repeat;
      background-position: center top;
    }
    .additional-add {
      background-image: url("/static/badges/additional add.png");
      position: absolute;
      left: 1110px;
      top: 242px;
      width: 84px;
      height: 30px;
      z-index: 10;
    }
    .additional-grade {
      background-image: url("/static/badges/additional grade.png");
      position: absolute;
      left: 745px;
      top: 330px;
      width: 161px;
      height: 26px;
      z-index: 14;
    }
    .additional-grade-99-additional {
      background-image: url("/static/badges/additional grade 99 additional.png");
      position: absolute;
      left: 1119px;
      top: 246px;
      width: 77px;
      height: 22px;
      z-index: 11;
    }
    .only-equipment {
      // background-image: url("/static/badges/only equipment.png");
      position: absolute;
      left: 216px;
      top: 560px;
      width: 298px;
      height: 26px;
      z-index: 7;
      color: #FE9400;
      font-size: 25px;
      line-height: 30px;
    }
    .unprotect {
      background-image: url("/static/badges/unprotect.png");
      position: absolute;
      left: 207px;
      top: 616px;
      width: 316px;
      height: 59px;
      z-index: 4;
    }
    .weight {
      // background-image: url("/static/badges/weight.png");
      position: absolute;
      left: 799px;
      top: 300px;
      width: 29px;
      height: 23px;
      z-index: 3;
      color: #7A7C7B;
      font-size: 24px;
      line-height: 20px;
    }
    .level {
      position: absolute;
      left: 26px;
      top: 41px;
      width: 54px;
      height: 26px;
      z-index: 12;
      color: #fff;
      font-size: 27px;
      line-height: 27px;
      text-align: center;
      letter-spacing: -2px;
      text-shadow: #ffac31 2px 0 0, #ffac31 0 2px 0, #ffac31 -2px 0 0, #ffac31 0 -2px 0;
      *filter: Glow(color=#ffac31, strength=1);
    }
    .badges-icon-manual {
      position: absolute;
      left: 10px;
      top: 200px;
      width: 700px;
      height: 700px;
      z-index: 15;
      background-repeat: no-repeat;
      background-position: center top;
      background-size: auto 100%;
    }
  }
}

.badges-show {
  width: 100%;
  height: auto;
}
</style>
