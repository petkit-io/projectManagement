<template>
  <div class="main__container">
    <div class="main-list">
      <div class="main-list-item">
        <div class="main-list-item__header main-list-item__header--dev">
          <span>开发中。。。</span>
          <i class="fas fa-plus main-list-item__add" @click="addBranch = true"></i>
        </div>
        <div class="main-list-item__list">
          <draggable class="dragArea" :options="{group: 'test'}" :list="devingList" @change="changeStatus">
            <div class="main-list-item__item" v-for="detail in devingList">
              <div class="main-list-item__item-branch">分支名：{{detail.branch}}</div>
              <div class="main-list-item__item-title">标题：{{detail.title}}</div>
              <div class="main-list-item__item-desp">描述：{{detail.desp}}</div>
              <span class="fas fa-trash-alt main-list-item__item-trash-alt" @click="deleteBranchDetail('devingList', detail)"></span>
            </div>
          </draggable>
        </div>
      </div>
      <div class="main-list-item">
        <div class="main-list-item__header main-list-item__header--testing">测试中</div>
        <div class="main-list-item__list">
          <draggable class="dragArea" :options="{group: 'test'}" :list="testingList" @change="changeStatus">
            <div class="main-list-item__item" v-for="detail in testingList">
              <div class="main-list-item__item-branch">分支名：{{detail.branch}}</div>
              <div class="main-list-item__item-title">标题：{{detail.title}}</div>
              <div class="main-list-item__item-desp">描述：{{detail.desp}}</div>
            </div>
          </draggable>
        </div>
      </div>
      <div class="main-list-item">
        <div class="main-list-item__header main-list-item__header--publishing">待发布</div>
        <div class="main-list-item__list">
          <draggable class="dragArea" :options="{group: 'test'}" :list="waitToPushlishList" @change="changeStatus">
            <div class="main-list-item__item" v-for="detail in waitToPushlishList">
              <div class="main-list-item__item-branch">分支名：{{detail.branch}}</div>
              <div class="main-list-item__item-title">标题：{{detail.title}}</div>
              <div class="main-list-item__item-desp">描述：{{detail.desp}}</div>
            </div>
          </draggable>
        </div>
      </div>
      <div class="main-list-item">
        <div class="main-list-item__header main-list-item__header--published">待合并</div>
        <div class="main-list-item__list">
          <draggable class="dragArea" :options="{group: 'test'}" :list="publishedList" @change="changeStatus">
            <div class="main-list-item__item" v-for="detail in publishedList">
              <div class="main-list-item__item-branch">分支名：{{detail.branch}}</div>
              <div class="main-list-item__item-title">标题：{{detail.title}}</div>
              <div class="main-list-item__item-desp">描述：{{detail.desp}}</div>
            </div>
          </draggable>
        </div>
      </div>
      <div class="main-list-item">
        <div class="main-list-item__header main-list-item__header--merged">已完成</div>
        <div class="main-list-item__list">
          <draggable class="dragArea" :options="{group: 'test'}" :list="mergedList" @change="changeStatus">
            <div class="main-list-item__item" v-for="detail in mergedList">
              <div class="main-list-item__item-branch">分支名：{{detail.branch}}</div>
              <div class="main-list-item__item-title">标题：{{detail.title}}</div>
              <div class="main-list-item__item-desp">描述：{{detail.desp}}</div>
            </div>
          </draggable>
        </div>
      </div>
    </div>

    <el-dialog
      title="提示"
      :visible.sync="addBranch"
      width="75%"
      center>
      <el-form ref="form" :model="detail" label-width="80px">
        <el-form-item label="分支名称">
          <el-input placeholder="请输入内容" v-model="detail.branch"></el-input>
        </el-form-item>
        <el-form-item label="标题">
          <el-input placeholder="请输入内容" v-model="detail.title"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" placeholder="请输入内容" v-model="detail.desp">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="centerDialogVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="saveBranchDetail">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script src="./main.ts" lang="ts"></script>
<style src="./main.scss" lang="scss"></style>