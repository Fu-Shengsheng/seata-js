import ZooKeeper from 'zookeeper'
import { AbstractConfiguration } from "../config-core/abstract-configuration"
import { ConfigurationKeys } from '../../seata-common/configuration-keys'
import { ZOO_PERSISTENT } from 'zookeeperConstants'

/**
 * The type Zookeeper configuration
 *
 * @class ZookeeperConfiguration
 * @extends {AbstractConfiguration}
 * 
 * @author Fss
 */
export class ZookeeperConfiguration extends AbstractConfiguration {
    private static CONFIG_TYPE = 'zk'
    private static ZK_PATH_SPLIT_CHAR = '/'
    private static ROOT_PATH = ZookeeperConfiguration.ZK_PATH_SPLIT_CHAR + ConfigurationKeys.SEATA_FILE_ROOT_CONFIG
    // TO-DO: 等待补全 ConfigurationFactory 的定义
    // private static FILE_CONFIG: Configuration = ConfigurationFactory.CURRENT_FILE_INSTANCE;
    private static SERVER_ADDR_KEY = "serverAddr";
    private static SESSION_TIMEOUT_KEY = "sessionTimeout";
    private static CONNECT_TIMEOUT_KEY = "connectTimeout";
    private static AUTH_USERNAME = "username";
    private static AUTH_PASSWORD = "password";
    private static SERIALIZER_KEY = "serializer";
    private static CONFIG_PATH_KEY = "nodePath";
    private static THREAD_POOL_NUM = 1;
    private static DEFAULT_SESSION_TIMEOUT = 6000;
    private static DEFAULT_CONNECT_TIMEOUT = 2000;
    private static DEFAULT_CONFIG_PATH = ZookeeperConfiguration.ROOT_PATH + "/seata.properties";
    private static FILE_CONFIG_KEY_PREFIX = ConfigurationKeys.FILE_ROOT_CONFIG + ConfigurationKeys.FILE_CONFIG_SPLIT_CHAR + ZookeeperConfiguration.CONFIG_TYPE + ConfigurationKeys.FILE_CONFIG_SPLIT_CHAR
    // TO-DO: java.util.concurrent 底层依赖库的 TS 对应实现
    // private static CONFIG_EXECUTOR:ExecutorService = new ThreadPoolExecutor(THREAD_POOL_NUM, THREAD_POOL_NUM, Integer.MAX_VALUE, TimeUnit.MILLISECONDS, new LinkedBlockingQueue<>(), new NamedThreadFactory("ZKConfigThread", THREAD_POOL_NUM))
    private static zkClient: ZooKeeper
    private static MAP_INITIAL_CAPACITY = 8;
    // TO-DO: java.util.concurrent 底层依赖库的 TS 对应实现
    // private static ConcurrentMap<String, ConcurrentMap<ConfigurationChangeListener, ZKListener>> CONFIG_LISTENERS_MAP = new ConcurrentHashMap<>(MAP_INITIAL_CAPACITY)
    // TO-DO: java.util 底层依赖库的 TS 对应实现
    // private static Properties seataConfig = new Properties();

    public constructor() {
        super()
        if (!ZookeeperConfiguration.zkClient) {
            // TO-DO: 等待补全 FILE_CONFIG 静态属性后更新配置
            const config = {
                connect: 'http://localhost',
                timeout: 5000,
                debug_level: ZooKeeper.ZOO_LOG_LEVEL_WARN,
                host_order_deterministic: false,
            }
            ZookeeperConfiguration.zkClient = new ZooKeeper(config)
            ZookeeperConfiguration.zkClient.init(config)
            ZookeeperConfiguration.zkClient.on('connect', () => {
                console.log('connect zookeeper')
            })
        }
        ZookeeperConfiguration.zkClient.exists(ZookeeperConfiguration.ROOT_PATH, false).then(
            rootPathExists => {
                if (!rootPathExists) {
                    const buffer = Buffer.from('')
                    ZookeeperConfiguration.zkClient.create(ZookeeperConfiguration.ROOT_PATH, buffer, ZOO_PERSISTENT)
                }
            }
        )
    }
}