import { memo, Fragment, FC } from 'react';
import PrettierCode from './PrettierCode';
const configs: { code: string; lines?: number[] }[] = [
  {
    code: `const handelError = (error?: any) => {
        setStatus('fallback');
        if (error?.target?.readyState === 2) {
        // 重连三次，如果失败则降级
            if (retryCountRef.current < maxRetries) {
                initiateConnection();
                retryCountRef.current += 1;
            } else {
                destroyConnection();
            }
        }
        if (!connectionTimeoutRef.current) {
            connectionTimeoutRef.current = setInterval(() => {
                //降级处理
                onFallback?.();
            }, 1000);
        }
    };`,
    lines: [5, 6, 7, 15],
  },
  {
    code: `  const currentOnMessage = (event: MessageEvent) => {
            if (!isMountedRef.current) return;
            onMessage(event);
            if (heartbeatCheckRef.current) {
              // 心跳存在，清除检测定时器
                clearTimeout(heartbeatCheckRef.current);
                heartbeatCheckRef.current = null;
            }

            heartbeatCheckRef.current = setTimeout(() => {
                console.log('心跳停止，重新连接');
                reconnect();
            }, 15000);
        };`,
    lines: [6, 7, 12],
  },
  {
    code: `function precisionCountdown(timestamp) {
  // 首帧初始化
  if (!lastTimestamp) lastTimestamp = timestamp;
  // 计算实际时间增量
  const actualDelta = timestamp - lastTimestamp;
  lastTimestamp = timestamp;
  // 理论时间增量(按60FPS=16.67ms)
  const targetDelta = 1000 / 60; 
  // 检测异常帧
  if (Math.abs(actualDelta - targetDelta) > ERROR_THRESHOLD) {
    // 动态补偿：误差越大补偿越激进
    const error = actualDelta - targetDelta;
    accumulatedError += error * K; // K为补偿系数，可调整
  }
  // 应用补偿值更新倒计时
  countdownValue -= (targetDelta + accumulatedError);
  // 重置累积误差(避免过度补偿)
  if (Math.abs(accumulatedError) < 1) accumulatedError = 0;
  requestAnimationFrame(precisionCountdown);
}`,
    lines: [10, 12, 13],
  },
  {
    code: `const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible' && isActive) {
                // 页面重新可见，重新计算时间
                if (endTimeRef.current) {
                    const currentDiff = endTimeRef.current - Date.now();
                    setRemaining(Math.max(0, currentDiff));
                    // 重新启动动画循环
                    if (!animationRef.current && currentDiff > 0) {
                        animationRef.current = requestAnimationFrame(updateTimer);
                    }
                }
            } else if (document.visibilityState === 'hidden' && animationRef.current) {
                // 页面不可见时，只停止动画循环，不改变状态
                cancelAnimationFrame(animationRef.current);
                animationRef.current = undefined;
            }
        };`,
    lines: [5, 6, 8, 9],
  },
  {
    code: `const renderNextChunk = () => {
      if (renderedChunkIndex >= totalChunks) {
        setIsRendering(false);
        return;
      }
      const startIdx = renderedChunkIndex * chunkSize;
      const endIdx = Math.min(startIdx + chunkSize, list.length);
      const currentChunk = list.slice(startIdx, endIdx);
      setRenderChunks((prev) => [...prev, ...currentChunk]);
      setProgress(Math.floor(((renderedChunkIndex + 1) / totalChunks) * 100));
      renderedChunkIndex++;
      if (typeof requestIdleCallback !== 'undefined') {
        requestIdleCallback(renderNextChunk, { timeout: 500 });
      } else {
        setTimeout(renderNextChunk, renderDelay);
      }
    };`,
    lines: [8, 9],
  },
  {
    code: `Module({
    imports: [
    PaladinConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [PaladinConfigModule],
      inject: [PaladinConfigService],
      useFactory: async (paladinService) => {
      const p = paladinService
      const { mysqlConfig } = p.get('application');
        return {
          type: 'mysql',
          entities: [ProjectEntities],
          ...mysqlConfig,
        };
      },
    }),
    HttpModule,
    // 健康检查
    HealthModule, 
    // 定时任务
    CornModule, 
    // 业务模块
    SearchModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // 日志拦截器（自定义提供者）
    {
    provide: APP_INTERCEPTOR,
    useClass: LoggerInterceptor},
  ]})`,
    lines: [11, 12, 13, 23, 24],
  },
  {
    code: `
  // DTO设计
  export class UserDto {
  @ApiProperty({ description: 'ad账号' })
  @IsString()
  readonly adAccount: string;

  @ApiProperty({ description: '昵称' })
  @IsString()
  readonly nickName: string}
  // 表设计
  @Entity()
export class HrProjectEntities {
  @PrimaryGeneratedColumn()
  id: number;

  @Column(
  { 
  type: 'varchar', 
  length: 255,
  comment: '项目名称' 
  })
  projectName: string;

  @Column({ 
  type: 'varchar', length: 255, comment: 'tree节点ID' })
  appId: string;

  @CreateDateColumn({ 
  type: 'timestamp' })
  ctime: Date;
}
  `,
    lines: [1, 11, 12],
  },
  {
    code: `
  // 响应头拦截
  chrome.webRequest.onHeadersReceived.addListener(
  (details) => {
  const {responseHeaders,url} = details
    const result =responseHeaders?.filter(
      (i) => i.name === 'Set-Cookie' || i.name === 'set-cookie',
    );
    if (result?.length) {
      chrome.runtime.sendMessage(
        {
          from: 'bgcookies',
          data: result.map((i) => i.value),
        },
      );
    }
  },
  {
    urls: [
      'http://alpha.dashboard.bilibili.co/*',
      'https://dashboard-mng.bilibili.co/*',
      'https://administration.bilibili.co/*',
    ],
  },
  ['responseHeaders', 'extraHeaders'],
);

//设置cookie
    const arr=[".bilibili.co", ".biliapi.net", domain]
    const domains = Array.from(new Set(arr.filter(Boolean))
  );
  domains.forEach((d) => {
    const targetCookie = cookieToJson(cookie, d);
    chrome.cookies.set(targetCookie);
  });`,
    lines: [1, 6, 9, 10, 11, 27, 30, 25],
  },
  {
    code: ` const duration = useMemo(() => {
        if (status === OnLineBiddingStatus.BIDDING) {
            return bidEndTime - serverLocalTime;
        }
    }, [serverLocalTime, bidEndTime]);`,
    lines: [3],
  },
];
const CodeList: FC = () => {
  const suppliers = ['供应商1', '供应商2', '...', '供应商m'];

  const objects = ['产品1', '产品2', '...', '产品n'];

  const columns = [1, 2, '...', 40];

  function generateCartesianProduct(suppliers, objects, columns) {
    const result = [];

    // 遍历每个数组的嵌套循环
    for (let i = 0; i < suppliers.length; i++) {
      for (let j = 0; j < objects.length; j++) {
        for (let k = 0; k < columns.length; k++) {
          // 生成三元组并添加到结果
          result.push([suppliers[i], objects[j], columns[k]]);
        }
      }
    }

    return result;
  }

  const arr = generateCartesianProduct(suppliers, objects, columns);
  console.log(arr);

  return (
    <Fragment>
      {configs?.map((item) => (
        <div key={item.code} style={{ marginBottom: 12 }}>
          <PrettierCode key={item.code} code={item.code} lines={item.lines} />
        </div>
      ))}
    </Fragment>
  );
};
export default memo(CodeList);
