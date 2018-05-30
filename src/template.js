const template = ["<div class=\"main\">",
  "    <header>",
  "        <span class=\"date\">{{date}}</span>",
  "        <div class=\"flex\"></div>",
  "        <span class=\"user\">by {{user.name}}</span>",
  "    </header>",
  "    <section class=\"info\">",
  "        <div class=\"logo\">",
  "            <img src=\"{{user.avatar}}\"",
  "                 alt=\"\">",
  "        </div>",
  "        <div class=\"title\">",
  "            <img src=\"../img/sun.png\" alt=\"\">",
  "            <div class=\"name\">{{user.name}} 的日报</div>",
  "            <img src=\"../img/moon_and.png\" alt=\"\">",
  "        </div>",
  "        <div class=\"time-line\">",
  "            <hr>",
  "            <ul>",
  "                {{each timeline t k}}",
  "                <li>",
  "                    <div class=\"time\">{{t.time}}</div>",
  "                    <div class=\"content\">",
  "                        <dl>",
  "                            {{each t.work v k2}}",
  "                            <dd>{{v}}</dd>",
  "                            {{/each}}",
  "                        </dl>",
  "                    </div>",
  "                </li>",
  "                {{/each}}",
  "            </ul>",
  "        </div>",
  "    </section>",
  "    <section class=\"other\">",
  "        <h2>其他事项</h2>",
  "        <ul>",
  "            {{each other}}",
  "            <li>{{$value}}</li>",
  "            {{/each}}",
  "        </ul>",
  "    </section>",
  "    <section class=\"list\">",
  "        <ul>",
  "            <li>",
  "                <h3><img src=\"../img/time.svg\" alt=\"\"><span>工作进度</span></h3>",
  "                {{each progress task k}}",
  "                <div class=\"task\">",
  "                    <div class=\"h\">",
  "                        <span>{{task.title}}</span>",
  "                        <div class=\"p\">",
  "                            <div class=\"date\">",
  "                                <div>{{task.per}}%</div>",
  "                            </div>",
  "                            <div class=\"progress\">",
  "                                <div style=\"width: {{task.per}}%;\"></div>",
  "                            </div>",
  "                        </div>",
  "                    </div>",
  "                    <p>{{task.duration}}</p>",
  "                    <div class=\"markdown-body\">{{task.desc}}</div>",
  "                </div>",
  "                {{/each}}",
  "            </li>",
  "            <li>",
  "                <h3><img src=\"../img/msg.svg\" alt=\"\"><span>遇到的问题</span></h3>",
  "                <div class=\"markdown-body\">{{task.problem}}</div>",
  "            </li>",
  "            <li>",
  "                <h3><img src=\"../img/think.svg\" alt=\"\"><span>思考与感悟</span></h3>",
  "                <div class=\"markdown-body\">",
  "                    {{thought}}",
  "                </div>",
  "            </li>",
  "            <li>",
  "                <h3><img src=\"../img/plan.svg\" alt=\"\"><span>明日工作计划</span></h3>",
  "                <div class=\"markdown-body\">",
  "                    {{plan}}",
  "                </div>",
  "            </li>",
  "        </ul>",
  "    </section>",
  "    <section class=\"contact\">",
  "        <div class=\"qrcode\">",
  "            <img src=\"{{info.qrcode}}\" alt=\"\">",
  "        </div>",
  "        <p>Wechat: {{info.wechat}}</p>",
  "        <p>QQ: {{info.qrcode}}</p>",
  "    </section>",
  "    <script>",
  "      function getPic() {",
  "        html2canvas(document.querySelector(\".main\")).then(canvas => {",
  "          var a = document.createElement(\'a\');",
  "          a.href = canvas.toDataURL();",
  "          a.download = \"dr-\" + (new Date()).toLocaleDateString() + \".png\";",
  "          a.click();",
  "          document.querySelector(\".main\").style.display = \"none\";",
  "          document.body.appendChild(canvas)",
  "        });",
  "      }",
  "    </script>",
  "</div>"].join("");

export default template;