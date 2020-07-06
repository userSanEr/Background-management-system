import Vue from 'vue'
//引入elementui
import {
    Button,
    Form,
    FormItem,
    Input,
    Container,
    Main,
    Aside,
    Header,
    Col,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    Breadcrumb,
    BreadcrumbItem,
    Tag,
    Row,
    Card,
    Table,
    TableColumn,
    Select,
    Option,
    Switch,
    Pagination,
    Loading,
    Dialog,
    DatePicker,
    Message,
    MessageBox,
    Cascader
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Cascader);
Vue.use(DatePicker);
Vue.use(Dialog);
Vue.use(Loading);
Vue.use(Pagination);
Vue.use(Select);
Vue.use(Option);
Vue.use(Switch);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Card);
Vue.use(Row);
Vue.use(Tag);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Container);
Vue.use(Main);
Vue.use(Aside);
Vue.use(Header);
Vue.use(Col);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Dropdown);
Vue.use(MenuItemGroup);
Vue.use(DropdownItem);
Vue.use(DropdownMenu);
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
