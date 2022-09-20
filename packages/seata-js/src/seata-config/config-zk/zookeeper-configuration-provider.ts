import { ConfigurationProvider, Configuration } from '../config'
import { ZookeeperConfiguration } from './zookeeper-configuration'

/**
 * 
 *
 * @export
 * @class ZookeeperConfigurationProvider
 * @implements {ConfigurationProvider}
 */
export class ZookeeperConfigurationProvider implements ConfigurationProvider {
    provide(): Configuration {
        return new ZookeeperConfiguration()
    }
}