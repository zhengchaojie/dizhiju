<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel icon-people" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-description">
          <div class="card-panel-text">
            <span>
              道路交通
            </span>
            <span>
              <count-to prefix="+" suffix="%" :decimals="2" :start-val="0" :end-val="4.08" :duration="2600" />
            </span>
          </div>
          <count-to :start-val="0" :end-val="102400" :duration="2600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel icon-message" @click="handleSetLineChartData('messages')">
        <!-- <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="message" class-name="card-panel-icon" />
        </div> -->
        <div class="card-panel-description">
          <div class="card-panel-text">
            <span>
              安全生产排名
            </span>
            <span>
              <count-to prefix="+" suffix="%" :decimals="2" :start-val="0" :end-val="4.08" :duration="2600" />
            </span>
          </div>
          <count-to :start-val="0" :end-val="81212" :duration="2600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel icon-money" @click="handleSetLineChartData('purchases')">
        <!-- <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="money" class-name="card-panel-icon" />
        </div> -->
        <div class="card-panel-description">
          <div class="card-panel-text">
            <span>
              隐患排查治理
            </span>
            <span>
              <count-to prefix="+" suffix="%" :decimals="2" :start-val="0" :end-val="4.08" :duration="2600" />
            </span>
          </div>
          <count-to :start-val="0" :end-val="9280" :duration="2600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel icon-shopping" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-description">
          <div class="card-panel-text">
            <span>
              外协管理
            </span>
            <span>
              <count-to prefix="+" suffix="%" :decimals="2" :start-val="0" :end-val="4.08" :duration="2600" />
            </span>
          </div>
          <count-to :start-val="0" :end-val="13600" :duration="2600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  components: {
    CountTo
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 10px 10px 40px rgba(0, 0, 0, .15);
    border-color: rgba(0, 0, 0, .05);
    border-radius: 10px;
    padding: 20px;
    box-sizing: border-box;
    &.icon-people {
      background: rgb(64, 201, 198);
      box-shadow: 5px 5px 20px rgba(64, 201, 198, .5);
    }

    &.icon-message {
      background: rgb(54, 163, 247);
      box-shadow: 5px 5px 20px rgba(54, 163, 247, .5);
    }

    &.icon-money {
      background: rgb(244, 81, 108);
      box-shadow: 5px 5px 20px rgba(244, 81, 108, .5);
    }

    &.icon-shopping {
      background: rgb(255, 185, 128);
      box-shadow: 5px 5px 20px rgba(255, 185, 128, .5);
    }
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      font-weight: bold;
      color: white;
      .card-panel-text {
        line-height: 18px;
        color: white;
        font-size: 16px;
        margin-bottom: 12px;
        display: flex;
        justify-content: space-between;
      }

      .card-panel-num {
        font-size: 30px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
