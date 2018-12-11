import { IDetail } from './main.interface';
import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';
import localforage from 'localforage';

@Component
export default class Main extends Vue {
  // public wx = require('vuedraggable/dist/vuedraggable');

  public addBranch: boolean = false;
  public devingList: IDetail[] = [];
  public testingList: IDetail[] = [];
  public waitToPushlishList: IDetail[] = [];
  public publishedList: IDetail[] = [];
  public mergedList: IDetail[] = [];
  public detail: IDetail = {
    branch: '',
    title: '',
    desp: '',
  };

  private listNames: string[] = ['devingList', 'testingList', 'waitToPushlishList', 'publishedList', 'mergedList'];

  public saveBranchDetail() {
    const isExisted = this.devingList.some((item) => item.branch === this.detail.branch);
    if (!isExisted) {
      this.devingList.push(this.detail);
      window.console.log(this.devingList, this.detail);
      localforage.setItem('devingList', this.devingList).then(() => {
        this.addBranch = false;
        this._resetDetail();
      });
    } else {
      this.$message.error('已存在了该分支名，请重新输入');
    }
  }

  public changeStatus() {
    this.listNames.map((item) => {
      localforage.setItem(item, this[item]);
    });
  }

  public deleteBranchDetail(listName: string, detail: IDetail) {
    const branch: string = detail.branch;
    this.$confirm(`是否要删除名为 ${branch} 的分支？`, '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(() => {
      const index: number = this.devingList.findIndex((item) => item.branch === branch);
      this[listName].splice(index, 1);
      localforage.setItem(listName, this[listName]).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!',
        });
      });
    }).catch((e) => {
      window.console.log(e);
    });
  }

  private created() {
    localforage.getItem('devingList').then((devingList: IDetail[]) => {
      this.devingList = devingList || [];
    });
    localforage.getItem('testingList').then((testingList: IDetail[]) => {
      this.testingList = testingList || [];
    });
    localforage.getItem('waitToPushlishList').then((waitToPushlishList: IDetail[]) => {
      this.waitToPushlishList = waitToPushlishList || [];
    });
    localforage.getItem('publishedList').then((publishedList: IDetail[]) => {
      this.publishedList = publishedList || [];
    });
    localforage.getItem('mergedList').then((mergedList: IDetail[]) => {
      this.mergedList = mergedList || [];
    });
  }


  private _resetDetail() {
    this.detail = {
      branch: '',
      title: '',
      desp: '',
    };
  }
}
